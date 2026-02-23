import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'wiki.db');
const IS_VERCEL = !!process.env.VERCEL;

let db = null;

async function getDb() {
  if (db) return db;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  return db;
}

function saveDb() {
  if (!db) return;
  // On Vercel, the filesystem is read-only — skip disk writes
  if (IS_VERCEL) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

async function initialize() {
  const db = await getDb();

  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      module TEXT NOT NULL,
      keywords TEXT DEFAULT '',
      role TEXT DEFAULT 'staff',
      date_updated TEXT NOT NULL,
      version INTEGER DEFAULT 1,
      cc_version TEXT DEFAULT '24.1'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS related_articles (
      article_id INTEGER NOT NULL,
      related_id INTEGER NOT NULL,
      PRIMARY KEY (article_id, related_id),
      FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
      FOREIGN KEY (related_id) REFERENCES articles(id) ON DELETE CASCADE
    )
  `);

  db.run('CREATE INDEX IF NOT EXISTS idx_articles_module ON articles(module)');
  db.run('CREATE INDEX IF NOT EXISTS idx_articles_role ON articles(role)');

  db.run(`
    CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL,
      vote INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS article_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS article_media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      url TEXT NOT NULL,
      caption TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS modules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      sort_order INTEGER DEFAULT 0
    )
  `);

  db.run('CREATE INDEX IF NOT EXISTS idx_votes_article ON votes(article_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_questions_article ON article_questions(article_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_media_article ON article_media(article_id)');

  saveDb();
}

async function seed() {
  const database = await getDb();

  const result = database.exec('SELECT COUNT(*) as cnt FROM articles');
  const count = result[0]?.values[0][0] || 0;
  if (count > 0) {
    // Ensure modules table is seeded even if articles already exist
    const modResult = database.exec('SELECT COUNT(*) as cnt FROM modules');
    const modCount = modResult[0]?.values[0][0] || 0;
    if (modCount === 0) {
      const defaultModules = ['F&B', 'Membership', 'Tee Sheet', 'Reports', 'Register'];
      const modStmt = database.prepare('INSERT OR IGNORE INTO modules (name, sort_order) VALUES (?, ?)');
      defaultModules.forEach((name, i) => modStmt.run([name, i]));
      modStmt.free();
      saveDb();
      console.log('Seeded modules table.');
    }
    console.log('Database already seeded. Skipping.');
    return;
  }

  const articles = [
    // === REGISTER ===
    {
      title: 'Add a Service Item',
      content: `This article explains how to add a Service (Non-Stock) item in the Club Caddie POS Inventory Center. Service items are used for items that don't require inventory tracking, such as green fees, cart fees, lessons, or other services.\n\n## Step 1: Access Inventory Center\nFrom the main POS screen, click the **gear icon** in the top-right corner to open the Settings menu. In the left sidebar, click **Inventory Center** to access the inventory management interface. Then click the **ADD ITEM** button in the top-right area to begin creating a new inventory item.\n\n![Step 1](/images/add-service-item/step-01.png)\n\n## Step 2: Select Inventory Location\nIn the Details tab, select where this item should live in your inventory structure:\n- Click the **Department** dropdown and select the appropriate department\n- Click the **Sub-Department** dropdown and select the correct sub-department\n- Click the **Category** dropdown and select the appropriate category\n\n> **Note:** The Sub-Department is where the "go code" lives. Make sure the item is placed in the correct Sub-Department so it routes correctly in reporting and operations.\n\n![Step 2](/images/add-service-item/step-02.png)\n\n## Step 3: Set Item Type to Service\nUnder the **Type** dropdown, select **Serv** (Service) to designate this as a non-stock item. A Service item in Club Caddie does not track inventory quantities.\n\nIf this service item is a green fee or cart fee, also select the appropriate **SubType**. This integrates the item with rack rate and class rate management modules.\n\n> **Note:** SubType is only required for green fees or cart fees. If the item is food & beverage or any other service type, leave SubType blank.\n\n![Step 3](/images/add-service-item/step-03.png)\n\n## Step 4: Enter Item Name and Pricing\nComplete the required item details:\n- **Item**: Enter the item name (e.g., "Employee Cart")\n- **Item Cost**: Enter the cost value (typically 0 for service items)\n- **Sale Price**: Enter the selling price for this item\n- **Floor Price**: Enter the minimum allowed price (typically 0)\n\n![Step 4](/images/add-service-item/step-04.png)\n\n## Step 5: Configure Loyalty Settings (Optional)\nIf this service item should earn loyalty points, configure the loyalty settings:\n- **Loyalty Earned**: Enter the points value\n- **Loyalty Earned Type**: Select the earning method:\n  - **Points Per Dollar**: Earns 1 point for every $1 spent (default)\n  - **Fixed**: Earns a specific point value regardless of price\n\n![Step 5](/images/add-service-item/step-05.png)\n\n## Step 6: Select Tax Group\nClick the **Tax Group** dropdown and select the appropriate tax setting:\n- **Sales Tax**: Standard sales tax will apply\n- **No Sales Tax**: Item is tax-exempt\n\n> **Note:** Selecting a Tax Group is strongly recommended to ensure taxes apply correctly when this item is sold.\n\n![Step 6](/images/add-service-item/step-06.png)\n\n## Step 7: Save the Service Item\nReview all entered information for accuracy, then click the **Save** button at the bottom of the form. The item will now be available in the inventory system and can be added to transactions from the Register.\n\n![Step 7](/images/add-service-item/step-07.png)`,
      module: 'Register',
      keywords: 'service item, non-stock, inventory center, add item, green fee, cart fee, lesson, pricing, tax group, loyalty, POS',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Create Combo Items',
      content: `This article explains how to create a combo item in Club Caddie POS. Combo items allow you to bundle multiple products together and sell them as a single unit at a custom price. This is useful for creating product packages such as a dozen golf balls (4 sleeves), meal deals, or any bundled merchandise.\n\n## Step 1: Access Inventory Center\nFrom the main POS screen, click the **gear icon** in the top-right corner to open the Settings menu. In the left sidebar, click **Inventory Center**, then click **Add / Manage Items** and select **ADD ITEM**.\n\n![Step 1](/images/create-combo-items/step-01.png)\n\n## Step 2: Select Inventory Location\nChoose where the combo button will appear in your inventory structure:\n- Click the **Department** dropdown (e.g., Merchandise)\n- Click the **Sub-Department** dropdown (e.g., Golf Balls)\n- Click the **Category** dropdown (e.g., Callaway)\n\nThis determines where the combo item button will appear in the register.\n\n![Step 2](/images/create-combo-items/step-02.png)\n\n## Step 3: Set Type to Combo and Name the Item\n- Click the **Type** dropdown and select **Combo**\n- Click into the **Item** field and enter a descriptive name (e.g., "Dozen Chrome Soft")\n- Click **Save** to create the combo item\n\n> **Note:** The Item Cost, Sales Price, and Floor Price fields will appear grayed out at this stage. This is normal because the combo pricing is calculated from the individual items you add next.\n\n![Step 3](/images/create-combo-items/step-03.png)\n\n## Step 4: Open Setup Combo and Add Items\nAfter saving the combo, configure its contents:\n- Click the **Setup Combo** tab at the top of the form\n- In the Item Search field, type to search for items (e.g., "Chrome Soft")\n- Select the desired item from the dropdown list\n- Click **Add Item** to add it to the combo\n- Repeat to add the item multiple times for the desired quantity (e.g., add 4 sleeves for a dozen)\n\n> **Note:** Each click of Add Item adds one unit. For a dozen golf balls made up of 4 sleeves, you would add the sleeve item 4 times.\n\n![Step 4](/images/create-combo-items/step-04.png)\n\n## Step 5: Edit Pricing for Each Item\nAdjust the price for each item line in the combo:\n- In the Assembly Items list, locate each item line\n- Click **Edit** next to the item\n- Enter the desired price for that item within the combo (e.g., 12.99)\n- Click **Save** to confirm the price\n- Repeat for each item line\n\nThe total combo price is calculated by adding up all individual item prices.\n\n![Step 5](/images/create-combo-items/step-05.png)\n\n## Step 6: Review Combo Details and Save\n- Click the **Details** tab to review the pre-populated values\n- Verify the Item Cost, Sales Price, and Floor Price are correct\n- These values are automatically calculated from the items added\n- Click **Save** to save all changes, then click **Close**\n\n![Step 6](/images/create-combo-items/step-06.png)\n\n## Step 7: Verify Combo in Register\n- Navigate to the **Register** from the main menu\n- Browse to the category where you placed the combo item\n- Verify the combo button appears with the correct name and price\n- Test that clicking the combo adds it to the cart correctly\n\n![Step 7](/images/create-combo-items/step-07.png)`,
      module: 'Register',
      keywords: 'combo item, bundle, package, inventory center, golf balls, dozen, assembly, combo pricing, register, POS',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Golf Day End Closing Procedures',
      content: `This article covers how to close out a golf POS day by running Day End Closing from Tools, selecting the correct date/user, counting and entering drawer cash, entering checks, closing the terminal, and reviewing the Day End report to confirm expected vs actual cash.\n\n## Step 1: Open Day End Closing\nClick **TOOLS**, then click **Day End Closing**.\n\n![Step 1](/images/day-end-closing/step-01.png)\n\n## Step 2: Select Closing Date and User\nSelect the correct date and select the user responsible for closing the drawer/terminal.\n\n![Step 2](/images/day-end-closing/step-02.png)\n\n## Step 3: Count Drawer Cash and Enter Total\nIf you have a starting balance, count all cash in the drawer including the starting balance. Enter the total as "starting balance + counted cash." Click **Enter Exact Amount** to confirm.\n\n![Step 3](/images/day-end-closing/step-03.png)\n\n## Step 4: Enter Cash Denominations\nEnter the cash denomination amount. Click the button(s) to add the denomination to the total and continue through the cash entry prompts until the full drawer count is entered.\n\n![Step 4](/images/day-end-closing/step-04.png)\n\n## Step 5: Save the Cash Count\nConfirm the final counted total in the drawer (example: $610.40). Click **Save** to record the total cash amount.\n\n![Step 5](/images/day-end-closing/step-05.png)\n\n## Step 6: Enter Check Totals (If Applicable)\nIf you collected checks, enter the total check amount. If needed, click **Add check** to enter multiple checks.\n\n> **Note:** This is optional and only used if checks were collected.\n\n![Step 6](/images/day-end-closing/step-06.png)\n\n## Step 7: Close the Day\nClick **Close Day** to finalize the terminal closing process. When prompted, confirm by selecting **Yes**. The system will print a receipt after you confirm.\n\n![Step 7](/images/day-end-closing/step-07.png)\n\n## Step 8: Print and Confirm Closing Receipt\nCollect the printed Day End Closing receipt from the printer. Click **Save** to confirm the receipt was received.\n\n![Step 8](/images/day-end-closing/step-08.png)\n\n## Step 9: Review the Day End Receipt PDF\nOpen the Day End Receipt PDF. Review the total summary report, including overall sales and gross sales at the bottom, and the reported total cash collected.\n\n![Step 9](/images/day-end-closing/step-09.png)\n\n## Step 10: Review Expected vs Actual Cash\nReview the report details showing:\n- Expected drop amount\n- Actual counted amount\n- Any variance\n- Payment breakdowns\n\nIf there is a large variance, recount your cash and bank. Once confirmed, deposit the cash into the safe.\n\n> **Note:** Small variances like $2.19 are typically acceptable.\n\n![Step 10](/images/day-end-closing/step-10.png)`,
      module: 'Register',
      keywords: 'day end, closing, cash count, drawer, close day, receipt, reconciliation, variance, deposit, tools, end of day',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Process Gift Card Sales',
      content: `This article explains how to sell gift cards from the POS register, including adding a customer, entering the gift card amount, scanning or typing the card number, and completing payment. It also covers how to check a gift card balance and redeem gift cards during checkout.\n\n## Sell a Gift Card\n\n### Step 1: Open the Tools Menu and Select Gift Card\nFrom the Register screen, click **TOOLS** in the menu bar. Then click **Gift Card** under the Gift Vouchers section to open the Generate Credit Voucher form.\n\n![Step 1](/images/gift-card-sales/step-01.png)\n\n### Step 2: Add a Customer (Optional)\nTo link the gift card to a specific customer profile, click the **magnifying glass icon** next to Add Customer. Search for and select the customer, then click **Done**.\n\n> **Note:** Linking a gift card to a customer allows them to look up their balance by name in the future.\n\n![Step 2](/images/gift-card-sales/step-02.png)\n\n### Step 3: Enter the Gift Card Amount\nIn the **Voucher Amount** field, enter the dollar value to load onto the gift card. The system will display the purchase date automatically.\n\n![Step 3](/images/gift-card-sales/step-03.png)\n\n### Step 4: Enter or Scan the Gift Card Number\nChange the Voucher No dropdown from "Auto" to **Specified**. This enables the card number entry field. Either scan the physical gift card with a barcode scanner, or manually type the gift card number.\n\n> **Note:** Using "Specified" allows you to assign a specific card number. If left on "Auto," the system generates a random voucher code.\n\n![Step 4](/images/gift-card-sales/step-04.png)\n\n### Step 5: Add the Gift Card to the Sale\nClick the **ADD** button to add the gift card to the transaction. The gift card will appear in the order summary showing the voucher amount as the Grand Total.\n\n![Step 5](/images/gift-card-sales/step-05.png)\n\n### Step 6: Complete the Payment\nClick **Pay** to proceed. Select the customer's payment method (Cash, Check, Credit Card, etc.). For cash payments, enter the amount received or click **Pay Exact Amount**. Ensure Print Customer Receipt is checked.\n\n![Step 6](/images/gift-card-sales/step-06.png)\n\n### Step 7: Print and Provide Receipts\nClick **OK** to complete the transaction. The system will print a credit customer receipt plus a voucher receipt containing the gift card number. Give both receipts to the customer.\n\n> **Note:** The voucher receipt contains the gift card number needed for redemption. Always provide this to the customer.\n\n![Step 7](/images/gift-card-sales/step-07.png)\n\n## Verify & Redeem Gift Cards\n\n### Step 8: Check a Gift Card Balance\nTo check a gift card balance without processing a sale, go to **TOOLS** and click **Check Voucher Balance**. Search by customer name or gift card number to view the current balance.\n\n![Step 8](/images/gift-card-sales/step-08.png)\n\n### Step 9: Redeem a Gift Card During Checkout\nDuring a regular checkout transaction, select **Gift Card/Credit Voucher** as the payment method. Search for the gift card by number or customer name, select it, and click **Done**. Confirm the balance with OK to apply the gift card to the transaction.\n\n> **Note:** If the gift card balance is less than the total, the remaining amount will need to be paid with another payment method.\n\n![Step 9](/images/gift-card-sales/step-09.png)`,
      module: 'Register',
      keywords: 'gift card, voucher, sell gift card, redeem, balance, credit voucher, payment, barcode, scan, tools, register',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Search and Verify Gift Card Balances',
      content: `This article covers the different ways to search and verify a gift card balance in Club Caddie POS, including checking from Tools, searching by voucher number or customer name, searching during checkout, and reviewing usage details in the Vouchers module.\n\n## Step 1: Open Check Voucher Balance\nGo to **Tools**, then click **Check Voucher Balance**.\n\n![Step 1](/images/gift-card-balances/step-01.png)\n\n## Step 2: Search by Gift Card Number or Customer Name\nIn the Check Voucher Balance screen, either:\n- Type the gift card number and click **Search**, or\n- Search by the customer's last name\n\n> **Note:** Searching by last name can pull up rain checks or gift cards tied to that customer.\n\n![Step 2](/images/gift-card-balances/step-02.png)\n\n## Step 3: View the Balance\nReview the returned gift card and its current balance. Click **Clear Search** to remove the previous search before searching again.\n\n![Step 3](/images/gift-card-balances/step-03.png)\n\n## Step 4: Use Customer Name/Voucher No. Search\nClick **Search Customer Name, Voucher No.** Enter the customer's last name, then locate and select the correct search result.\n\n![Step 4](/images/gift-card-balances/step-04.png)\n\n## Step 5: Search During Checkout\nStart a sale by selecting a merchandise area, then select an item. Click **Pay**, then click **OK**. When prompted with Gift card credit voucher, click **OK**.\n\n> **Note:** This checkout flow is another option for searching a gift card.\n\n![Step 5](/images/gift-card-balances/step-05.png)\n\n## Step 6: Search from the Checkout Prompt\nClick into the gift card search area, then use **Search Customer Name, Voucher No.** Enter the gift card number, click **Search**, and review the balance.\n\n![Step 6](/images/gift-card-balances/step-06.png)\n\n## Step 7: Use the Vouchers Module for Detailed Activity\nClick **Vouchers**, then click **Gift Card**. Search by voucher number as needed. Click **Usage** to view detailed gift card activity and usage. Wait for the usage information to load, then review the transaction history.\n\n> **Note:** This module shows all details and usage for gift cards, including when actions occurred. You can drill down to a receipt level view.\n\n![Step 7](/images/gift-card-balances/step-07.png)`,
      module: 'Register',
      keywords: 'gift card, balance, voucher, check balance, search, verify, usage, tools, customer name, voucher number, redeem',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Sell a Discounted Gift Card',
      content: `This guide provides step-by-step instructions for selling discounted gift cards through the register system.\n\n> **CRITICAL:** When selling a discounted gift card, the gift card MUST be the only item in that transaction. Do not include any other products (shirts, golf balls, etc.) as the discount will incorrectly apply to those items as well.\n\n## Step 1: Access the Gift Card Function\nNavigate to **Tools** in your system, select **Register**, then click on **Gift Card**.\n\n![Step 1](/images/discounted-gift-card/step-03.png)\n\n## Step 2: Add Customer Information (Optional)\nAt the top of the screen, you will see a field to tag in a customer name. If selling to a specific customer, search for and select their profile. This step is optional but recommended for tracking purposes.\n\n## Step 3: Enter Gift Card Details\n- Enter the **Voucher Amount** (e.g., $100 for a hundred-dollar gift card)\n- The **Expiration Date** will be automatically populated\n- Input the gift card number using one of these methods:\n  - Manually type in the gift card number\n  - Scan the barcode on the gift card\n  - Swipe the magnetic strip (click the KB button, then slide the gift card)\n\n## Step 4: Add Gift Card to Register\nClick **Add** to pull the gift card into the register. The gift card will now appear in the transaction.\n\n![Step 4](/images/discounted-gift-card/step-01.png)\n\n## Step 5: Apply the Discount\n- Locate the pre-populated discount options below the transaction\n- Click the **dropdown menu**\n- Select **Gift Card Discount**\n- Click **Apply**\n\nThe applicable discount will be applied to the gift card.\n\n![Step 5](/images/discounted-gift-card/step-02.png)\n\n## Step 6: Verify Transaction Details\n- Review the discount total displayed on screen\n- Confirm the transaction total reflects the discounted amount (e.g., $80 for a $100 gift card with 20% discount)\n- **Ensure no other items are included in this transaction**\n\n## Step 7: Process Payment\nClick **Pay**, select the payment method (e.g., Cash), enter the payment amount (this should match the discounted price, not the gift card value), and complete the transaction.\n\n![Step 7](/images/discounted-gift-card/step-06.png)\n\n## Step 8: Verify Gift Card Balance\nAfter completing the transaction, locate the gift card in the system. Verify that the gift card shows the **full voucher amount** (e.g., $100), not the discounted sale price. The customer paid the discounted amount but receives the full gift card value.\n\n![Step 8](/images/discounted-gift-card/step-05.png)\n\n## Example Transaction\n- **Gift Card Value:** $100\n- **Discount Applied:** 20% ($20 off)\n- **Customer Pays:** $80\n- **Gift Card Balance After Sale:** $100\n\n## Common Mistakes to Avoid\n- Including other products in the transaction — the discount will apply to all items\n- Forgetting to apply the discount before processing payment\n- Using an already-activated gift card number`,
      module: 'Register',
      keywords: 'discounted gift card, gift card discount, voucher, sale price, register, tools, barcode, discount apply, gift card balance',
      role: 'staff',
      date_updated: '2026-02-19',
      version: 1
    },
    // === TEE SHEET ===
    {
      title: 'Check In Group Reservations and Apply Payment',
      content: `This article covers how to check in a group reservation on the tee sheet, choose the correct check-in method, take payment, add golfers/items into the register cart, charge a group to an event account, and verify check-in counts.\n\n## Step 1: Confirm the Correct Date\nBefore checking in, verify the reservation date matches the day you're checking in.\n\n> **Note:** Checking in early (example: checking in on January 8th for a January 9th reservation) will record revenue on the wrong date.\n\n![Step 1](/images/check-in-group/step-01.png)\n\n## Step 2: Right-Click the Group Reservation\nRight-click the group reservation to access the available check-in options.\n\n> **Note:** There are three options for checking in group reservations.\n\n![Step 2](/images/check-in-group/step-02.png)\n\n## Step 3: Check In Individual Golfer (Register/Cart Workflow)\nSelect **Check-in price 1** to check in a single golfer and bring the golfer into the register/cart.\n\n> **Note:** This option brings the player into the register so you can add additional items.\n\n![Step 3](/images/check-in-group/step-03.png)\n\n## Step 4: Add Items and Take Payment\nAdd any additional items to the cart (examples: range balls or merchandise). Select the payment method (e.g., cash) and complete the transaction. Click **Pay Exact Amount** to finalize.\n\n![Step 4](/images/check-in-group/step-04.png)\n\n## Step 5: Check In with QuickPay (Bypass Register)\nSelect **Check-in QuickPay** (choose the QuickPay price) to bypass the register and go directly to the payment screen. Click **OK** to proceed. Choose the payment method (gift card, credit card, or cash). If paying cash, select **Pay Exact Amount**, then click **OK**.\n\n> **Note:** QuickPay is a faster path because it bypasses the register.\n\n![Step 5](/images/check-in-group/step-05.png)\n\n## Step 6: Use Check-In Plus for Multiple Golfers\nRight-click the reservation and select **Check-in Plus**. Enter the number of golfers to include on the payment. If some golfers have already paid, enter the remaining number. Update the list to assign rates if multiple rates apply, then click **Check-in**.\n\n> **Note:** This option is used when you want multiple golfers on one payment.\n\n![Step 6](/images/check-in-group/step-06.png)\n\n## Step 7: Charge to an Event Account\nSelect the **Event charge** option. Search for the relevant event. Select the correct event date, then click **Done**. Click **OK** to confirm charges applied to the event account.\n\n> **Note:** This is a way to charge the group to an account for final payment later.\n\n![Step 7](/images/check-in-group/step-07.png)\n\n## Step 8: Verify Check-In Counts\nRight-click on the tee sheet and select **View check-ins**. Review the summary of who was checked in at a price and who was charged to the account.\n\n![Step 8](/images/check-in-group/step-08.png)`,
      module: 'Tee Sheet',
      keywords: 'check in, group reservation, QuickPay, check-in plus, event charge, payment, tee sheet, register, cart, group',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Add a Group Booking',
      content: `This article covers how to add a group booking on the tee sheet, including selecting the start time, entering group details, setting group pricing, attaching a customer profile, and saving the booking.\n\n## Step 1: Start a New Group Booking\nRight-click the desired tee time (start time), then click **ADD group reservation**.\n\n![Step 1](/images/group-booking/step-01.png)\n\n## Step 2: Review Start/End Time Behavior\nReview the buttons above that set the start time. Confirm the end time is grayed out while **Auto Select** is enabled. Auto Select will automatically adjust the end time based on the number of players you select.\n\n![Step 2](/images/group-booking/step-02.png)\n\n## Step 3: Enter the Group Name\nEnter the group name. The group name will display on the tee sheet, and you can include as many details as you'd like.\n\n![Step 3](/images/group-booking/step-03.png)\n\n## Step 4: Enter Number of Golfers\nEnter the number of golfers for the group booking.\n\n![Step 4](/images/group-booking/step-04.png)\n\n## Step 5: Select Group Price\n- Select the group price (example: outing 18 ride)\n- Review the default price (defaults to $17, the standard rate for golf carts)\n- If needed, update the price (example: change it to $95)\n\n> **Note:** The $17 default is the standard cart rate and can be increased as needed.\n\n![Step 5](/images/group-booking/step-05.png)\n\n## Step 6: Add Additional Pricing Options (Optional)\nIf desired, select any of the additional group pricing options (three additional pricing options are available). You can select multiple prices for the group or keep it as a single price.\n\n![Step 6](/images/group-booking/step-06.png)\n\n## Step 7: Attach a Customer Profile (Optional)\n- Click the **magnifying glass** to open the customer list\n- Search by last name in the search bar, then click **Search**\n- Select the correct customer name and click **Done**\n\n![Step 7](/images/group-booking/step-07.png)\n\n## Step 8: Review Customer Profile\nReview that the selected individual(s) are added to the profile. If needed, attach a card to the customer profile. Click the **eyeball icon** to return to the profile.\n\n![Step 8](/images/group-booking/step-08.png)\n\n## Step 9: Confirm Active Status\nEnsure the customer profile displays as **Active**.\n\n![Step 9](/images/group-booking/step-09.png)\n\n## Step 10: Add Payment Card (Optional)\nClick the **Payment** tab. Enter the card information, then click **Save**.\n\n![Step 10](/images/group-booking/step-10.png)\n\n## Step 11: Save the Group Booking\nClick **Save** to finalize and record the group booking.\n\n![Step 11](/images/group-booking/step-11.png)\n\n## Step 12: Verify the Booking\nConfirm the group outing displays as successfully created on the tee sheet.\n\n![Step 12](/images/group-booking/step-12.png)`,
      module: 'Tee Sheet',
      keywords: 'group booking, group reservation, outing, tee sheet, pricing, customer profile, auto select, payment, group name',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Issue Rain Checks for Multiple Players',
      content: `This article covers how to issue a single rain check transaction that covers multiple players on the same tee time (e.g., 4 players paid under one payer), adjust holes played, issue the rain check voucher, and print receipts.\n\n## Step 1: Open the Tee Time\nLocate the tee time where one person paid for all players (example: paid for 4 players). Right-click into their tee time.\n\n![Step 1](/images/rain-checks-multi/step-01.png)\n\n## Step 2: Start the Rain Check Process\nClick **Issue Raincheck**.\n\n![Step 2](/images/rain-checks-multi/step-02.png)\n\n## Step 3: Confirm Players\nVerify all 4 players are listed when the rain check screen opens.\n\n> **Note:** Selecting Issue Raincheck automatically pulls in all players for that tee time.\n\n![Step 3](/images/rain-checks-multi/step-03.png)\n\n## Step 4: Update Holes Played\nChange the holes played selections to match the group's actual progress. Use the dropdown(s) to select the appropriate number of holes played for each player.\n\n![Step 4](/images/rain-checks-multi/step-04.png)\n\n## Step 5: Process the Refund\nReview the updated refund amount shown. Click **Refund**.\n\n![Step 5](/images/rain-checks-multi/step-05.png)\n\n## Step 6: Confirm the Refund\nClick the confirmation button to proceed with the refund.\n\n![Step 6](/images/rain-checks-multi/step-06.png)\n\n## Step 7: Select Rain Check Voucher\nClick **Rain Check Voucher**, then click **OK**.\n\n> **Note:** After clicking OK, the system will automatically print a receipt.\n\n![Step 7](/images/rain-checks-multi/step-07.png)\n\n## Step 8: Save the Transaction\nClick **Save**.\n\n![Step 8](/images/rain-checks-multi/step-08.png)\n\n## Step 9: Distribute Receipts\nProvide the printed receipts as needed.\n\n> **Note:** Two receipts will print: a customer copy and a voucher receipt that shows the total voucher amount.\n\n![Step 9](/images/rain-checks-multi/step-09.png)\n\n## Step 10: Review Issued Rain Check\nClick **Raincheck** to open the rain check management application. Open the rain check details to review. Review the voucher information (example: voucher A60 as the rain check number, with $11.17 on that rain check for all 4 players).`,
      module: 'Tee Sheet',
      keywords: 'rain check, multiple players, refund, voucher, holes played, tee time, receipt, raincheck, group refund',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Issue Rain Checks for Package Groups',
      content: `Rain checks allow customers who have paid for a round but are unable to complete it (due to weather, course conditions, etc.) to receive a voucher for the remaining value. Rain checks must be processed individually for each player — there is no bulk processing option.\n\n## Step 1: Locate the Booking\nNavigate to the **Tee Sheet** and find the booking that requires a rain check. Identify the specific player or group that has paid.\n\n![Step 1](/images/rain-checks-package/step-01.png)\n\n## Step 2: Right-Click and Select Issue Raincheck\nRight-click on the player's booking entry to open the context menu. Click **Issue Raincheck** to begin the process.\n\n![Step 2](/images/rain-checks-package/step-02.png)\n\n## Step 3: Confirm Rain Check Issuance\nThe Order Details panel appears showing the booking information. Click **Issue Raincheck** to proceed.\n\n![Step 3](/images/rain-checks-package/step-03.png)\n\n## Step 4: Select the Player\nThe system displays all players in the booking with their tee time details and costs. Select the specific player by clicking the checkbox next to their booking entry.\n\n> **Note:** Rain checks must be issued individually for each player. The system does not support selecting multiple players simultaneously.\n\n![Step 4](/images/rain-checks-package/step-04.png)\n\n## Step 5: Select Number of Holes Played\nClick on the **Holes Played** dropdown and select the number of holes completed (0-18). The system will automatically calculate the refund amount.\n\n> **Note:** Selecting 0 holes provides a full refund. The refund amount decreases proportionally as more holes are played.\n\n![Step 5](/images/rain-checks-package/step-05.png)\n\n## Step 6: Review Refund and Click Refund\nReview the calculated refund details including Refund Amount, Refund Tax, and Total Refund Amount. Click **Refund**.\n\n![Step 6](/images/rain-checks-package/step-06.png)\n\n## Step 7: Select Raincheck Voucher\nIn the Payment Mode dialog, select **Raincheck Voucher** as the refund method.\n\n> **Note:** Other options like Cash, Check, or Refund Voucher may be available, but Raincheck Voucher is the standard method for weather-related cancellations.\n\n![Step 7](/images/rain-checks-package/step-07.png)\n\n## Step 8: Confirm Voucher Creation\nClick **OK** to confirm. The system will process the refund and generate the voucher code.\n\n![Step 8](/images/rain-checks-package/step-08.png)\n\n## Step 9: Print the Receipt\nOnce processing is complete, click **OK** to print the rain check receipt. The receipt includes the recipient's name, voucher type, voucher amount, balance, and unique voucher code.\n\n![Step 9](/images/rain-checks-package/step-09.png)\n\n## Step 10: Review the Voucher Receipt\nThe printed receipt shows the Credit Voucher Receipt with all details: recipient name, voucher type (Raincheck), voucher amount, balance, and unique voucher code (e.g., A61).\n\n> **Note:** Keep a copy of the receipt for your records. The customer will need the voucher code to redeem their credit.\n\n![Step 10](/images/rain-checks-package/step-10.png)\n\n## Step 11: Repeat for Additional Players\nReturn to the Tee Sheet and right-click the next player's entry. Previously processed players will show as **Returned** status and cannot be selected again.\n\n> **Note:** For a group of 8 players, you will need to complete this entire process 8 separate times.\n\n![Step 11](/images/rain-checks-package/step-11.png)`,
      module: 'Tee Sheet',
      keywords: 'rain check, package group, voucher, refund, weather, holes played, tee sheet, credit voucher, individual, raincheck',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Issue a Rain Check for a Single Customer',
      content: `This article covers how to issue a rain check voucher for one player from their tee sheet check-in, select holes played, complete the refund, print the voucher receipt, and locate the issued rain check record.\n\n## Step 1: Locate the Player\nLocate the player on the tee sheet/check-in list (e.g., checked in at 3:50). Right-click the player profile, then click **Issue Rain Check**.\n\n![Step 1](/images/rain-check-single/step-01.png)\n\n## Step 2: Set the Holes Played\nOpen the rain check interface. Select the tee time and specify how many holes have been completed (e.g., 9 holes) so the refund amount updates accordingly.\n\n![Step 2](/images/rain-check-single/step-02.png)\n\n## Step 3: Start the Refund\nClick the **Refund** option to begin processing the rain check. Confirm the refund selection by clicking the appropriate confirmation button.\n\n![Step 3](/images/rain-check-single/step-03.png)\n\n## Step 4: Choose Rain Check Voucher\nSelect the **Rain Check Voucher** option. Leave the Voucher field blank if you want the system to auto-populate. Click **OK**.\n\n> **Note:** You may leave the voucher field blank to allow the system to auto-populate.\n\n![Step 4](/images/rain-check-single/step-04.png)\n\n## Step 5: Select POS Terminal\nClick the POS terminal associated with the player's transaction to continue.\n\n![Step 5](/images/rain-check-single/step-05.png)\n\n## Step 6: Print and Save\nContinue through the prompts to prepare the voucher receipt for printing. Print the rain check receipt/voucher for the player. Click **Save** to record the transaction.\n\n![Step 6](/images/rain-check-single/step-06.png)\n\n## Step 7: Confirm Print\nConfirm the receipt printed from the printer. Click **Yes** to approve the print confirmation.\n\n![Step 7](/images/rain-check-single/step-07.png)\n\n## Step 8: Review Issued Rain Check\nClick the **Rain Check** section to view issued rain checks. Click the correct rain check entry to open the record details. Enter the rain check identifier to locate the specific record, then click **Save**.\n\n![Step 8](/images/rain-check-single/step-08.png)\n\n## Step 9: Verify Voucher Details\nOpen the rain check PDF and review the voucher details (e.g., Rain Check voucher number 859 for $26.65).`,
      module: 'Tee Sheet',
      keywords: 'rain check, single customer, voucher, refund, holes played, POS terminal, receipt, raincheck, single player',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Processing USGA Youth on Course Rounds',
      content: `This SOP outlines the workflow for ringing in Youth on Course (YOC) rounds, which requires a split payment process different from standard rounds.\n\n## Prerequisites\n- Staff must have access to the register system and tee sheet\n- Facility must have a USGA YOC membership ID set up in the system\n- Staff should be familiar with basic register operations and split payment functionality\n- Verify that the tee time is properly designated as "USGA YOC 18 Walk" in the booking system\n\n## Step 1: Identify the Youth on Course Tee Time\nLocate the tee time on the tee sheet (e.g., 1:10 PM slot). Verify the tee time shows **"USGA YOC 18 Walk"** designation. Note the player name.\n\n## Step 2: Pull the Tee Time to Register\nSelect the tee time from the tee sheet and pull it through to the register system.\n\n## Step 3: Initiate Split Payment\nClick on **"Split Pay"** option in the register.\n\n## Step 4: Process the $5 Membership Payment\n- Select **"Membership ID"** as the first payment method\n- Enter **$5** as the amount\n- Click **"Search"**\n- Select your facility's USGA YOC membership ID from the list\n- Select the applicable facility\n- Click **"Done"**\n- Click the **"+"** button to apply that payment\n\n> **Note:** YOC rounds require $5 to go to the membership account, with the remainder charged to the customer's payment method.\n\n## Step 5: Verify Remaining Balance\nCheck the bottom of the screen to confirm:\n- Total paid: $5.00\n- Remaining balance: (e.g., $5.90)\n\n## Step 6: Process Remaining Payment\nSelect the customer's preferred payment method (cash, card, etc.). Enter the remaining amount. Click **"Pay and Finalize"**.\n\n## Step 7: Complete Transaction\nSystem will process the transaction. Receipt will print automatically. Transaction complete: $5 charged to YOC membership account, remainder charged to customer's payment method.\n\n## Tips & Tricks\n- Always verify the YOC designation before processing — regular rounds should not use this workflow\n- The $5 membership charge is **fixed** — this amount never changes regardless of the total round cost\n- Process the membership payment **first** — always apply the $5 to the YOC membership ID before collecting the customer's payment\n- Double-check the facility selection — ensure you're selecting the correct facility if your organization manages multiple locations\n- Watch for the "+" button — this must be clicked to apply the membership payment before proceeding\n\n## Troubleshooting\n- **Cannot find the USGA YOC membership ID:** Contact your manager or system administrator to verify the membership ID is set up correctly\n- **Split Pay option is grayed out:** Verify the tee time was properly pulled to the register; check permissions; restart the register if needed\n- **Wrong amount applied:** If not finalized, remove the payment and re-enter. If complete, process a refund and re-ring\n- **Customer payment declined after membership payment:** Request an alternative payment method; do not finalize until remaining balance is confirmed\n- **Tee time doesn't show USGA YOC designation:** Verify with the customer; contact booking department to correct; do not process as YOC if not designated`,
      module: 'Tee Sheet',
      keywords: 'USGA, youth on course, YOC, split payment, membership ID, $5 charge, tee time, register, split pay',
      role: 'staff',
      date_updated: '2026-02-19',
      version: 1
    },
    // === MEMBERSHIP ===
    {
      title: 'Sell an RTJ Trail Card Membership',
      content: `This article covers how to sell an RTJ Trail Card membership from the tee sheet/POS by locating the customer profile, signing them up, confirming membership dates and pay class, processing the fee, and completing payment.\n\n## Step 1: Open the Customer Profile\nFrom the Tee Sheet and Point of Sale, double-click into the customer's profile.\n\n![Step 1](/images/trail-card/step-01.png)\n\n## Step 2: Search for Customer\nClick the **magnifying glass** to search for the customer. Click **View Customer Profile** to open the selected customer's details.\n\n![Step 2](/images/trail-card/step-02.png)\n\n## Step 3: Start Membership Signup\nClick **Sign Up for Membership**, then scroll down and select **RTJ Trail Card**.\n\n![Step 3](/images/trail-card/step-03.png)\n\n## Step 4: Add Membership and Confirm Details\nAdd the membership to the profile (the system will automatically book the correct date). Review the auto-filled membership date and expiration date. Assign the pay class by charge account, then click **OK** and **Save**.\n\n> **Note:** The system auto-fills the membership and expiration dates.\n\n![Step 4](/images/trail-card/step-04.png)\n\n## Step 5: Confirm Activation and Rate Update\nVerify the membership now appears in the system and the customer's rate is updated to the Trail Card membership for check-in. When prompted, click **Yes** to confirm the updated membership rate.\n\n![Step 5](/images/trail-card/step-05.png)\n\n## Step 6: Go to Membership Payment\nNavigate to **Tools**, then select **Membership Payment**.\n\n![Step 6](/images/trail-card/step-06.png)\n\n## Step 7: Search Customer and Enter Payment\nClick **Search Customer**. Enter the customer profile information, then click **Search**. Select the customer and review the amount due. Enter the membership payment amount, then click **OK**.\n\n![Step 7](/images/trail-card/step-07.png)\n\n## Step 8: Combine Tabs (Optional)\nRight-click to open additional payment options in a new tab. Right-click within the tab and select **Add to Existing Order** to combine tabs. Click the customer name to assign the combined order.\n\n> **Note:** This combines payment tabs so everything can be paid together.\n\n![Step 8](/images/trail-card/step-08.png)\n\n## Step 9: Review Before Payment\nVerify the tee time booking is present at the regular rate plus the membership ID.\n\n![Step 9](/images/trail-card/step-09.png)\n\n## Step 10: Complete Payment\nClick **Pay** to begin processing. Complete payment for the entire transaction (membership + tee time fees). Click **Print Customer Receipt**, then click **OK**. Click **Pay Exact Amount** to finalize.\n\n![Step 10](/images/trail-card/step-10.png)\n\n## Step 11: Confirm Trail Card Sale\nConfirm the customer now has the tee time, payment, and membership added in one transaction.\n\n![Step 11](/images/trail-card/step-11.png)`,
      module: 'Membership',
      keywords: 'trail card, membership, signup, RTJ, customer profile, pay class, membership payment, tools, tee sheet',
      role: 'staff',
      date_updated: '2026-02-20',
      version: 1
    },
    {
      title: 'Selling a Monthly Membership Pass',
      content: `This SOP covers how to sell a monthly membership pass to new and renewing customers.\n\n## Step 1: Access Customer Account\nNavigate to the **Customers** tab. Option A: Create a new account using the "Add Customer" button. Option B: Search for and locate an existing customer account.\n\n## Step 2: Open Customer Account\nDouble-click the customer name OR click the action dots on the right and select "View/Edit."\n\n> **IMPORTANT:** Before proceeding, verify the account has ALL required fields: First Name, Last Name, Email, Mobile Number, Address, City, State, ZIP Code. Without these fields completed, you cannot sell a membership through the system.\n\n## Step 3: Access Membership Sign-Up\n**For NEW Members (first-time sign-up):**\nCheck the "Sign up for Membership" checkbox. This will automatically navigate to the Member Info tab.\n\n**For RENEWING Members:**\nClick directly on the "Member Info" tab. Their existing member number will be retained.\n\n## Step 4: Select Membership Class\n- Click **"Select Class"**\n- Choose the appropriate membership type (e.g., "Couple Monthly")\n- Set **Effective Date** to today's date (the sale date)\n- Expiration Date will auto-populate to one year from today\n- **CRITICAL:** Ensure the checkbox is checked to post the dues to the account — this displays what they owe for the first month's payment\n- Click **OK** to apply the membership\n- Click **Save** to save the account\n\n## Step 5: Process Payment via Register\n- Navigate to the **Register** tab\n- Go to **Tools → Select Membership Payment**\n- Click the magnifying glass icon\n- **New members:** Will appear at the top of the list\n- **Renewing members:** Use the search function at the top\n- Select the customer account and click **Done**\n\n## Step 6: Enter Payment Amount\nThe system will display the amount owed for the first month's payment. Enter this amount in the Amount box (e.g., $396.49). Click **OK**. The amount will transfer to the register.\n\n## Step 7: Complete Payment\nClick **Pay**. Select the customer's payment method (Check, Credit Card, Cash, etc.). If paying by check, enter the check number. Click **OK** to process the payment.\n\nThe customer has now paid their first month and is active in the system!\n\n## Common Mistakes to Avoid\n- Forgetting to check the "post dues" checkbox (Step 4)\n- Not saving the account after adding membership\n- Missing required customer information fields`,
      module: 'Membership',
      keywords: 'monthly membership, membership pass, signup, renewal, dues, customer profile, payment, register, tools, class',
      role: 'staff',
      date_updated: '2026-02-19',
      version: 1
    },
    {
      title: 'Selling a Prepaid Pass',
      content: `This SOP covers the process for selling prepaid annual passes to both new and existing customers.\n\n## Prerequisites\nBefore starting, ensure you have the following customer information ready:\n- First Name and Last Name\n- Email Address\n- Phone Number\n- Full Street Address\n- City, State, and ZIP Code\n\n> **TIP:** All fields listed above are REQUIRED to sign up a new member. Gather this information before beginning.\n\n## Step 1: Access Customer Profile\nNavigate to the **Customers** tab. For **NEW customers:** Click "Create Profile." For **EXISTING customers:** Use the search function to locate their account. Double-click the customer name to open their profile.\n\n![Step 1](/images/prepaid-pass/step-01.png)\n\n## Step 2: Set Up Member Information\n**For NEW customers:**\nCheck the "Signup" checkbox at the bottom of the profile. This will navigate you to the Member Info tab.\n\n**For RENEWING customers:**\nGo directly to the Member Info tab (skip the signup checkbox).\n\n## Step 3: Configure Membership Details\n- Note the auto-generated member number (no action needed)\n- Select the appropriate class from the dropdown (e.g., "Annual Pass Couple Paid in Full")\n- Set the **Effective Date** to TODAY (the purchase date)\n- The **Expiration Date** will automatically populate to one year out\n- **CRITICAL:** Ensure "Pay by Class Assignment by Charge Account" is turned **ON**\n- Click **OK** to apply the class to the account\n- Click **Save**\n\n![Step 3](/images/prepaid-pass/step-04.png)\n\n## Step 4: Process Payment\n- Exit the customer profile\n- Navigate to the **Register** tab\n- Go to **Tools → Membership Payment**\n- Click the magnifying glass icon to search for the customer\n- New customers will appear at the top of the list\n- Select the customer and click **Done**\n\n> **Note:** You'll see a "monthly balance" displayed, but this is NOT the amount you need to collect.\n\n![Step 4](/images/prepaid-pass/step-03.png)\n\n## Step 5: Enter Correct Payment Amount\n- **IGNORE the "Monthly Balance" shown on screen** — this only shows the first month's revenue recognition, NOT the full prepaid amount\n- Refer to the **prepaid pricing list** at your counter for the correct full amount\n- Enter the FULL prepaid amount (including tax), e.g., $4,387.25\n- Click **OK**\n\n> **CRITICAL:** Each course should have a reference list of full prepaid amounts. The monthly balance shown in the system is misleading for prepaid passes — always use the full amount from your pricing list.\n\n![Step 5](/images/prepaid-pass/step-02.png)\n\n## Step 6: Complete the Transaction\nThe full amount will populate in the register. Click **Pay**. Select the customer's payment method (cash, check, credit card, etc.). If paying by check, enter the check number and click **OK** to finalize.\n\nThe payment is now processed, the membership is applied to the account, and monthly revenue recognition will begin automatically.\n\n![Step 6](/images/prepaid-pass/step-05.png)\n\n## Common Mistakes to Avoid\n- Using the monthly balance amount instead of the full prepaid amount\n- Forgetting to turn ON "Pay by Class Assignment by Charge Account"\n- Not collecting all required customer information for new members\n- Confusing new signup process with renewal process\n\n## Key Reminders\n- **Payment Amount:** Always reference your counter's prepaid pricing list\n- **Dates:** Effective date should always be the day of purchase\n- **New vs. Renewal:** New members need the signup checkbox; renewals go straight to Member Info\n- **Revenue Recognition:** The system will automatically handle monthly revenue recognition after you deposit the full prepaid amount`,
      module: 'Membership',
      keywords: 'prepaid pass, annual pass, prepaid membership, signup, renewal, pricing list, charge account, revenue recognition, tools',
      role: 'staff',
      date_updated: '2026-02-19',
      version: 1
    }
  ];

  // Seed modules
  const defaultModules = ['F&B', 'Membership', 'Tee Sheet', 'Reports', 'Register'];
  const modStmt = database.prepare('INSERT OR IGNORE INTO modules (name, sort_order) VALUES (?, ?)');
  defaultModules.forEach((name, i) => modStmt.run([name, i]));
  modStmt.free();

  const insertStmt = database.prepare(
    'INSERT INTO articles (title, content, module, keywords, role, date_updated, version, cc_version) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  );

  for (const a of articles) {
    // Map version to Club Caddie release version
    const ccVer = a.cc_version || { 1: '24.1', 2: '24.2', 3: '25.1', 4: '25.2' }[a.version] || '25.1';
    insertStmt.run([a.title, a.content, a.module, a.keywords, a.role, a.date_updated, a.version, ccVer]);
  }
  insertStmt.free();

  // Add related article connections
  // 1=Add Service, 2=Combo, 3=DayEnd, 4=Gift Card Sales, 5=Gift Card Balance, 6=Discount GC
  // 7=Check In Group, 8=Group Booking, 9=Rain Multi, 10=Rain Package, 11=Rain Single, 12=USGA YOC
  // 13=Trail Card, 14=Monthly Membership, 15=Prepaid Pass
  const relations = [
    // Register cluster: gift cards
    [4, 5], [4, 6], [5, 4], [5, 6], [6, 4], [6, 5],
    // Register cluster: inventory
    [1, 2], [2, 1],
    // Register: day end
    [3, 4], [3, 5],
    // Tee Sheet cluster: group operations
    [7, 8], [8, 7],
    // Tee Sheet cluster: rain checks
    [9, 10], [9, 11], [10, 9], [10, 11], [11, 9], [11, 10],
    // Tee Sheet: check-in and group booking
    [7, 9], [7, 10],
    // Membership cluster
    [13, 14], [13, 15], [14, 13], [14, 15], [15, 13], [15, 14],
    // Cross-module: USGA YOC to membership
    [12, 13], [12, 14],
  ];

  const relStmt = database.prepare('INSERT INTO related_articles (article_id, related_id) VALUES (?, ?)');
  for (const [a, b] of relations) {
    relStmt.run([a, b]);
  }
  relStmt.free();

  // Seed "People Also Asked" questions
  const questions = [
    // Add a Service Item (1)
    { article_id: 1, question: 'What is the difference between a Service item and a Stock item?', answer: 'A Service (Serv) item does not track inventory quantities — it\'s used for things like green fees, cart fees, and lessons. Stock items track on-hand quantities and trigger reorder alerts.' },
    { article_id: 1, question: 'Do I need to set a SubType for all service items?', answer: 'No — SubType is only required for green fees or cart fees. For F&B service items or other service types, leave SubType blank or at the default setting.' },
    // Create Combo Items (2)
    { article_id: 2, question: 'Why are the pricing fields grayed out when I first create a combo?', answer: 'This is normal. The combo pricing is calculated from the individual items you add. After you add items in the Setup Combo tab and set their prices, the Details tab will auto-populate with the total.' },
    // Day End Closing (3)
    { article_id: 3, question: 'What should I do if there is a large cash variance?', answer: 'Recount your cash and bank. If the variance persists, document it on the closing report and notify your manager. Small variances like $2.19 are typically acceptable.' },
    // Process Gift Card Sales (4)
    { article_id: 4, question: 'What is the difference between Auto and Specified for voucher numbers?', answer: 'Auto generates a random voucher code. Specified lets you enter or scan a specific card number from a physical gift card. Use Specified when selling pre-printed gift cards.' },
    { article_id: 4, question: 'Can I link a gift card to a customer after the sale?', answer: 'The customer link is best done at the time of sale. However, you can look up the gift card in the Vouchers module to review details.' },
    // Gift Card Balances (5)
    { article_id: 5, question: 'Can I search by customer name instead of gift card number?', answer: 'Yes — in Check Voucher Balance, you can search by the customer\'s last name. This will pull up all rain checks and gift cards tied to that customer.' },
    // Discounted Gift Card (6)
    { article_id: 6, question: 'What happens if I include other items in the discounted gift card transaction?', answer: 'The gift card discount will incorrectly apply to all items in the transaction. Always make sure the gift card is the ONLY item in the transaction when applying a discount.' },
    // Check In Group (7)
    { article_id: 7, question: 'What is the difference between QuickPay and Check-In Price 1?', answer: 'Check-In Price 1 brings the golfer into the register/cart so you can add additional items before payment. QuickPay bypasses the register and goes directly to the payment screen for faster processing.' },
    // Rain Checks Package (10)
    { article_id: 10, question: 'Can I process rain checks in bulk for a package group?', answer: 'No — rain checks must be issued individually for each player. The system does not support selecting multiple players simultaneously. For a group of 8, you will need to complete the process 8 times.' },
    // USGA YOC (12)
    { article_id: 12, question: 'Does the $5 YOC membership charge ever change?', answer: 'No — the $5 membership charge is fixed and never changes regardless of the total round cost. Always apply exactly $5 to the YOC membership ID.' },
    { article_id: 12, question: 'What if the Split Pay option is grayed out?', answer: 'Verify the tee time was properly pulled to the register. Check that you have permissions for split payments. If the option remains unavailable, try restarting the register system.' },
    // Trail Card (13)
    { article_id: 13, question: 'Does the system auto-fill the membership dates?', answer: 'Yes — when you add the Trail Card membership to a customer profile, the system automatically fills in the membership date and expiration date.' },
    // Monthly Membership (14)
    { article_id: 14, question: 'What required fields must be filled before selling a membership?', answer: 'First Name, Last Name, Email, Mobile Number, Address, City, State, and ZIP Code. Without all these fields completed, you cannot sell a membership through the system.' },
    // Prepaid Pass (15)
    { article_id: 15, question: 'Why should I ignore the Monthly Balance shown on screen?', answer: 'The Monthly Balance only shows the first month\'s revenue recognition, NOT the full prepaid amount. Always refer to the prepaid pricing list at your counter for the correct amount to charge the customer.' },
  ];

  const qStmt = database.prepare('INSERT INTO article_questions (article_id, question, answer) VALUES (?, ?, ?)');
  for (const q of questions) {
    qStmt.run([q.article_id, q.question, q.answer]);
  }
  qStmt.free();

  // No placeholder media — real screenshots will be added via admin panel
  const media = [];

  // Seed some initial votes for demonstration
  const voteData = [
    { article_id: 1, up: 5, down: 0 },
    { article_id: 2, up: 3, down: 0 },
    { article_id: 3, up: 8, down: 1 },
    { article_id: 4, up: 10, down: 1 },
    { article_id: 5, up: 6, down: 0 },
    { article_id: 6, up: 4, down: 0 },
    { article_id: 7, up: 7, down: 1 },
    { article_id: 8, up: 5, down: 0 },
    { article_id: 9, up: 3, down: 0 },
    { article_id: 10, up: 4, down: 0 },
    { article_id: 11, up: 6, down: 1 },
    { article_id: 12, up: 9, down: 0 },
    { article_id: 13, up: 7, down: 1 },
    { article_id: 14, up: 8, down: 0 },
    { article_id: 15, up: 5, down: 0 },
  ];

  const voteStmt = database.prepare('INSERT INTO votes (article_id, vote) VALUES (?, ?)');
  for (const v of voteData) {
    for (let i = 0; i < v.up; i++) voteStmt.run([v.article_id, 1]);
    for (let i = 0; i < v.down; i++) voteStmt.run([v.article_id, -1]);
  }
  voteStmt.free();

  const mediaStmt = database.prepare('INSERT INTO article_media (article_id, type, url, caption, sort_order) VALUES (?, ?, ?, ?, ?)');
  for (const m of media) {
    mediaStmt.run([m.article_id, m.type, m.url, m.caption, m.sort_order]);
  }
  mediaStmt.free();

  saveDb();
  console.log(`Seeded ${articles.length} articles, ${relations.length} relations.`);
}

// Helper: run a query and return array of objects
function queryAll(database, sql, params = []) {
  const stmt = database.prepare(sql);
  if (params.length) stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function queryOne(database, sql, params = []) {
  const results = queryAll(database, sql, params);
  return results[0] || null;
}

export { getDb, saveDb, initialize, seed, queryAll, queryOne };
