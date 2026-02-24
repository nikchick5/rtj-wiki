// RTJ Club Caddie Wiki — Article Database
// Each article: { id, title, module, role, content, keywords, relatedIds, dateUpdated, version }
// ONLY articles sourced from RTJ SOPs B (Source of Truth folder) are included.

const MODULES = {
  REGISTER: {
    id: 'register',
    label: 'Register',
    icon: '<i class="fa-solid fa-cash-register"></i>',
    color: '#1b6d37',
    description: 'Ring up sales, process gift cards, issue rain checks, manage inventory items, and handle day-end register procedures.'
  },
  TEE_SHEET: {
    id: 'tee-sheet',
    label: 'Tee Sheet',
    icon: '<i class="fa-solid fa-calendar-days"></i>',
    color: '#0066cc',
    description: 'Check in golfers, manage group bookings, and handle tee time operations from the tee sheet.'
  },
  MEMBERSHIP: {
    id: 'membership',
    label: 'Membership',
    icon: '<i class="fa-solid fa-id-card"></i>',
    color: '#7d3c98',
    description: 'Set up trail cards, manage member profiles, and configure membership programs and benefits.'
  },
};

// role values: 'manager' | 'frontdesk' | 'fb' | 'all'
// 'all'       = every role sees this article
// 'frontdesk' = front desk / golf ops staff (register, tee sheet, rain checks, gift cards)
// 'fb'        = F&B staff (food & beverage register, orders)
// 'manager'   = managers only (back-office setup, reports, day-end close)
const ROLES = {
  MANAGER:   'manager',
  FRONTDESK: 'frontdesk',
  FB:        'fb',
  ALL:       'all',
};

const articles = [

  // ─── REGISTER ──────────────────────────────────────────────────────────────

  {
    id: 'reg-001',
    title: 'Add a Service Item',
    module: 'register',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ['service item', 'menu item', 'add item', 'register', 'pricing', 'product', 'inventory center', 'non-stock', 'greens fee', 'cart fee', 'loyalty', 'tax group'],
    relatedIds: ['reg-002', 'reg-007'],
    media: [],
    content: `
## Overview
Service (non-stock) items are products that don't require inventory tracking — things like greens fees, cart fees, lessons, or range balls. This procedure walks through adding a new service item in the Club Caddie POS Inventory Center.

## When to Use
- You need to add a brand-new service that doesn't exist in the system yet (e.g., a new greens fee tier, cart rental, or lesson package).
- A seasonal or special service item needs to be made available at the register.

## Step-by-Step

**Step 1: Open Settings Menu**
From the main POS screen, click the **gear icon** in the top-right corner to open the Settings menu.

![Click the gear icon in the top-right corner to open Settings](screenshots/reg-001-step01.png)

**Step 2: Select Inventory Center**
In the left sidebar, click **Inventory Center** to access the item management area.

![Click Inventory Center in the left sidebar](screenshots/reg-001-step02.png)

**Step 3: Initiate Adding a New Item**
Click the **ADD ITEM** button in the top-right area to begin creating a new service item.

![Click ADD ITEM to start creating a new item](screenshots/reg-001-step03.png)

**Step 4: Select Inventory Location**
In the Details tab, set where this item lives in your inventory structure:
- Click the **Department** dropdown and select the appropriate department.
- Click the **Sub-Department** dropdown and select the correct sub-department.
- Click the **Category** dropdown and select the appropriate category.

> **Note:** The Sub-Department is where the **GL code** (General Ledger code) lives. Make sure the item is placed in the correct Sub-Department so it routes correctly in reporting and operations.

![Choose the Department for this item](screenshots/reg-001-step04.png)

![Select the Sub-Department — this is where the GL code lives](screenshots/reg-001-step05.png)

![Select the Category](screenshots/reg-001-step06.png)

**Step 5: Set Item Type to Service**
Under the **Type** dropdown, select **Serv** (Service) to designate this as a non-stock item. A Service item does not track inventory quantities. If the item is a greens fee or cart fee, also select the appropriate **SubType** — this integrates the item with rack rate and class rate management modules.

> **Note:** SubType is only required for greens fees or cart fees. For food & beverage or other service types, leave SubType blank or at the default.

![Set the Type to Service — this makes it a non-stock item](screenshots/reg-001-step07.png)

![SubType is only needed for greens fees or cart fees — skip for other service types](screenshots/reg-001-step08.png)

**Step 6: Enter Item Name and Pricing**
Complete the required fields:
- **Item** – Enter the item name (e.g., "Employee Cart").
- **Item Cost** – Enter the cost value (typically 0 for service items).
- **Sale Price** – Enter the selling price.
- **Floor Price** – Enter the minimum allowed price (typically 0).

![Enter the item name in the Item field](screenshots/reg-001-step09.png)

![Set the Cost, Sales Price, and Floor Price](screenshots/reg-001-step10.png)

**Step 7: Configure Loyalty Settings (Optional)**
If this item should earn loyalty points, configure:
- **Loyalty Earned** – Enter the points value.
- **Loyalty Earned Type** – Select the earning method: **Points Per Dollar** (earns 1 point per $1 spent, default) or **Fixed** (earns a specific point value regardless of price).

![Configure loyalty earned type — choose between Points Per Dollar or Fixed](screenshots/reg-001-step12.png)

**Step 8: Select Tax Group**
Click the **Tax Group** dropdown and select the appropriate tax setting — either **Sales Tax** (standard) or **No Sales Tax** (tax-exempt). While not technically required, selecting a Tax Group is strongly recommended to ensure taxes apply correctly when this item is sold.

![Select the Tax Group — Sales Tax or No Sales Tax](screenshots/reg-001-step14.png)

**Step 9: Save the Service Item**
Review all entered information for accuracy, then click **Save**. The item will now be available in the inventory system and can be added to transactions from the Register.

![Click Save to add the service item to the system](screenshots/reg-001-step15.png)
    `
  },

  {
    id: 'reg-002',
    title: 'Create Combo Items',
    module: 'register',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ['combo', 'bundle', 'package', 'combo item', 'greens fee cart', 'round package', 'assembly items', 'inventory center', 'dozen golf balls'],
    relatedIds: ['reg-001'],
    media: [],
    content: `
## Overview
Combo items let you bundle multiple products together and sell them as a single unit at a custom price. This is useful for creating packages like a dozen golf balls (4 sleeves), meal deals, or any bundled merchandise. The combo appears as one button in the register, but each component is tracked separately in reports.

## When to Use
- You want staff to ring up bundled offerings with a single button press.
- You're creating product packages (e.g., a dozen golf balls from 4 individual sleeves, a Golf & Cart bundle).

## Step-by-Step

**Step 1: Access Inventory Center**
From the main POS screen, click the **gear icon** in the top-right corner to open the Settings menu. In the left sidebar, click **Inventory Center**. Then click **Add / Manage Items** and select **ADD ITEM** to begin creating a new item.

![Click the gear icon to open Settings](screenshots/reg-002-step00.png)

![Click Inventory Center in the sidebar](screenshots/reg-002-step02.png)

![Click ADD ITEM to start creating a new item](screenshots/reg-002-step05.png)

**Step 2: Select Inventory Location**
Choose where the combo button will appear in your inventory structure:
- Click the **Department** dropdown and select the appropriate department (e.g., Merchandise).
- Click the **Sub-Department** dropdown and select the correct sub-department (e.g., Golf Balls).
- Click the **Category** dropdown and select the category (e.g., Callaway).

![Select the Department for this combo item](screenshots/reg-002-step06.png)

![Select the Sub-Department](screenshots/reg-002-step08.png)

![Select the Category](screenshots/reg-002-step12.png)

**Step 3: Set Type to Combo and Name the Item**
Click the **Type** dropdown and select **Combo**. Enter a descriptive name in the **Item** field (e.g., "Dozen Chrome Soft"). Click **Save** to create the combo item.

> **Note:** The Item Cost, Sales Price, and Floor Price fields will appear grayed out at this stage. This is normal — the combo pricing is calculated from the individual items you add in the next steps.

![Set the Type to Combo and enter the item name — pricing fields are grayed out until sub-items are added](screenshots/reg-002-step13.png)

![Click Save to create the combo item](screenshots/reg-002-step14.png)

**Step 4: Open Setup Combo and Add Items**
After saving, click the **Setup Combo** tab at the top. In the Item Search field, type to find items (e.g., "Chrome Soft"), select the item from the dropdown, and click **Add Item**. Repeat to add each unit — for example, add the sleeve item 4 times for a dozen.

> **Note:** Each click of Add Item adds one unit. For a dozen golf balls made up of 4 sleeves, you'd add the sleeve item 4 separate times.

![Click Setup Combo to start adding sub-items](screenshots/reg-002-step15.png)

![Search for and select the item to add to the combo](screenshots/reg-002-step17.png)

![Click Add Item — repeat for each unit in the combo](screenshots/reg-002-step18.png)

**Step 5: Edit Pricing for Each Item**
In the Assembly Items list, click **Edit** next to each item line. Enter the desired price for that item within the combo (e.g., 12.99) and click **Save**. Repeat for each item line. The total combo price is calculated by adding up all individual item prices.

![Click Edit next to each item line to set the combo price](screenshots/reg-002-step25.png)

![Enter the updated price and click Save](screenshots/reg-002-step26.png)

**Step 6: Review Combo Details and Save**
Click the **Details** tab to review the pre-populated values. Verify the Item Cost, Sales Price, and Floor Price are correct — these are automatically calculated from the items added. Click **Save**, then click **Close**.

> **Note:** Loyalty redemption points and loyalty earned settings are also calculated based on the individual item configurations.

![Click Details to review the auto-calculated pricing](screenshots/reg-002-step39.png)

![Review the Item Cost, Sales Price, and Floor Price — then click Save](screenshots/reg-002-step40.png)

**Step 7: Verify Combo in Register**
Navigate to the **Register** from the main menu. Browse to the category where you placed the combo item. Verify the combo button appears with the correct name and price, and test that clicking it adds the combo to the cart correctly.

![Verify the combo item appears in the Register with the correct name and price](screenshots/reg-002-step46.png)
    `
  },

  {
    id: 'reg-004',
    title: 'Process a Gift Card Sale',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ['gift card', 'sell gift card', 'gift certificate', 'load gift card', 'activate', 'credit voucher', 'voucher', 'tools menu'],
    relatedIds: ['reg-006'],
    media: [],
    content: `
## Overview
This procedure covers selling gift cards from the POS register, including adding a customer (optional), entering the gift card amount, scanning or typing the card number, and completing payment. It also covers how to check a gift card balance and redeem gift cards during checkout.

> **Note:** In Club Caddie, gift cards are called **"Credit Vouchers"** in the system. The terms "gift card" and "credit voucher" refer to the same thing throughout these procedures.

## Sell a Gift Card

**Step 1: Open the Tools Menu and Select Gift Card**
From the Register screen, click **TOOLS** in the menu bar to open the Tools panel. Then click **Gift Card** under the Gift Vouchers section to open the Generate Credit Voucher form.

![Click the TOOLS button in the POS toolbar](screenshots/reg-004-step01.png)

![Select Gift Card from the Tools menu](screenshots/reg-004-step02.png)

**Step 2: Add a Customer (Optional)**
To link the gift card to a specific customer profile, click the **magnifying glass** icon next to Add Customer. Search for and select the customer, then click **Done**. This step is optional — you can skip it if the gift card is not being linked to a customer.

> **Note:** Linking a gift card to a customer allows them to look up their balance by name in the future.

![Click the magnifying glass to search for and add a customer](screenshots/reg-004-step04.png)

**Step 3: Enter the Gift Card Amount**
In the **Voucher Amount** field, enter the dollar value to load onto the gift card. The system will display the purchase date automatically. If your location uses expiration dates, you can review or set an expiration date in the fields below.

![Enter the voucher amount for the gift card](screenshots/reg-004-step06.png)

**Step 4: Enter or Scan the Gift Card Number**
Change the **Voucher No** dropdown from **"Auto"** to **"Specified"**. This enables the card number entry field. Either scan the physical gift card with a barcode scanner, or manually type the gift card number into the field.

> **Note:** **Auto** generates a random voucher code (use for digital/virtual gift cards). **Specified** lets you enter the number printed on the physical card (use when the customer has a physical gift card to scan or swipe).

![Change from Auto to Specified, then enter or scan the gift card number](screenshots/reg-004-step09.png)

**Step 5: Add the Gift Card to the Sale**
Click the **ADD** button to add the gift card to the transaction. The gift card will appear in the order summary on the right side of the screen showing the voucher amount as the Grand Total.

![Click ADD to add the gift card to the transaction](screenshots/reg-004-step13.png)

**Step 6: Complete the Payment**
Click **Pay** to proceed to payment. Select the customer's payment method (Cash, Check, Credit Card, etc.) from the Payment Mode options. For cash payments, enter the amount received or click **Pay Exact Amount**. Ensure **Print Customer Receipt** is checked.

![Click Pay and select the payment method to complete the transaction](screenshots/reg-004-step15.png)

![Select the payment method and click Pay Exact Amount](screenshots/reg-004-step20.png)

**Step 7: Print and Provide Receipts to Customer**
Click **OK** or **Close** to complete the transaction. The system prints a credit customer receipt plus a voucher receipt containing the gift card number. Give both receipts to the customer — they can attach the voucher receipt to the physical gift card for reference.

> **Note:** The voucher receipt contains the gift card number needed for redemption. Always provide this to the customer.

![The receipt prints with a credit customer receipt and a voucher receipt — provide both to the customer](screenshots/reg-004-step21.png)

## Check a Gift Card Balance (Without a Sale)

To check a gift card balance without processing a sale, go to **TOOLS** and click **Check Voucher Balance**. Search by customer name or gift card number to view the current balance.

## Redeem a Gift Card During Checkout

During a regular checkout transaction, when the customer is ready to pay, select **Gift Card/Credit Voucher** as the payment method. Search for the gift card by number or customer name, select it, and click **Done**. Confirm the balance with **OK** to apply the gift card to the transaction.

> **Note:** If the gift card balance is less than the total, the remaining amount will need to be paid with another payment method.
    `
  },

  {
    id: 'reg-006',
    title: 'Search and Verify Gift Card Balances',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ['gift card balance', 'check balance', 'gift card lookup', 'verify gift card', 'check voucher balance', 'voucher', 'usage', 'vouchers module'],
    relatedIds: ['reg-004'],
    media: [],
    content: `
## Overview
There are several ways to search and verify a gift card balance in Club Caddie — from the Tools menu, during checkout, or through the Vouchers module. This article covers all the methods available.

## Method 1: Check Voucher Balance (Tools Menu)

**Step 1: Open Check Voucher Balance**
Go to **Tools**, then click **Check Voucher Balance**.

![Click Check Voucher Balance from the Tools menu](screenshots/reg-006-step01.png)

**Step 2: Search by Gift Card Number or Customer Last Name**
In the Check Voucher Balance screen, either type the gift card number and click **Search**, or search by the customer's last name.

> **Note:** Searching by last name can pull up rain checks or gift cards tied to that customer.

![Enter a gift card number or customer last name and click Search](screenshots/reg-006-step02.png)

**Step 3: View the Balance**
Review the returned gift card and its current balance. Click **Clear Search** to remove the previous search before searching again.

![Review the gift card balance in the results](screenshots/reg-006-step03.png)

## Method 2: Search Customer Name / Voucher No.

**Step 1: Use the Search Customer Name, Voucher No. Option**
Click **Search Customer Name, Voucher No.** Enter the customer's last name, then locate and select the correct search result. This is another way to pull up customer-tied rain checks or gift cards to verify the balance.

![Click Search Customer Name, Voucher No. to search by name](screenshots/reg-006-step05.png)

![Enter the customer's last name and select the correct result](screenshots/reg-006-step08.png)

## Method 3: Check Balance During Checkout

**Step 1: Search a Gift Card Balance While Paying for an Item**
Start a sale by selecting a merchandise area and an item. Click **Pay**, then click **OK**. When prompted with **Gift card credit voucher**, click **OK**.

![Select a merchandise item, then click Pay](screenshots/reg-006-step12.png)

**Step 2: Search for the Gift Card from the Checkout Prompt**
Click into the gift card search area, then use **Search Customer Name, Voucher No.** Enter the gift card number, click **Search**, and review the balance.

![Search for the gift card number from the checkout prompt](screenshots/reg-006-step17.png)

![Review the balance from the search results](screenshots/reg-006-step19.png)

## Method 4: Vouchers Module (Detailed Usage)

**Step 1: Use the Vouchers Module**
Click **Vouchers**, then click **Gift Card**. Search by voucher number as needed. Click **Usage** to view detailed gift card activity and transaction history.

> **Note:** The Vouchers module shows all details and usage for gift cards, including when actions occurred. You can drill down to a receipt-level view.

![Click Vouchers, then Gift Card to access the Vouchers module](screenshots/reg-006-step20.png)

![View gift card details and click Usage to see transaction history](screenshots/reg-006-step22.png)

![Usage shows a full transaction history — including dates and receipt-level detail](screenshots/reg-006-step24.png)
    `
  },

  {
    id: 'reg-007',
    title: 'Issue a Rain Check (Single Customer)',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.4',
    keywords: ['rain check', 'raincheck', 'refund', 'weather', 'credit', 'issue rain check', 'voucher', 'single player'],
    relatedIds: ['reg-008'],
    media: [],
    content: `
## Overview
Use this procedure to issue a rain check voucher for one player from their tee sheet check-in. You'll select holes played to calculate the refund amount, complete the voucher/refund flow, print the voucher receipt, and locate the issued rain check record.

## When to Use
- A customer's round is cut short due to rain or inclement weather.
- A manager has authorized a rain check for a single player.

## Step-by-Step

**Step 1: Locate the Player and Issue Rain Check**
Find the player on the tee sheet/check-in list. Right-click the player's name to open the context menu, then click **Issue Rain Check**.

![Right-click the player on the Tee Sheet to open the context menu](screenshots/reg-007-step01.png)

**Step 2: Set the Holes Played**
The rain check interface opens. Select the tee time and specify how many holes have been completed (e.g., select 9 holes) so the refund amount updates accordingly.

![Select the number of holes played — the refund amount updates automatically](screenshots/reg-007-step03.png)

**Step 3: Start the Refund**
Click the **Refund** option to begin processing the rain check. Confirm the refund selection by clicking the confirmation button.

![Click Refund to begin processing the rain check](screenshots/reg-007-step04.png)

![Confirm the refund selection](screenshots/reg-007-step05.png)

**Step 4: Choose the Rain Check Voucher Option**
Select **Rain Check Voucher**. You may leave the Voucher field blank — the system will auto-populate an item/receipt. Click **OK**.

![Select Rain Check Voucher as the refund method](screenshots/reg-007-step06.png)

**Step 5: Select the POS Terminal**
Click the POS terminal associated with the player's transaction to continue.

![Select the POS terminal for this transaction](screenshots/reg-007-step07.png)

**Step 6: Print and Save**
Continue through the prompts to prepare the voucher receipt. Print the rain check receipt/voucher for the player. Click **Save** to record the transaction. Confirm the receipt printed successfully by clicking **Yes**.

![Print the rain check receipt for the player](screenshots/reg-007-step09.png)

![Click Save to record the transaction](screenshots/reg-007-step10.png)

**Step 7: Review the Rain Check Record**
Click the **Rain Check** section to view issued rain checks. Click the correct entry to open the record details. You can also open the rain check PDF from File Explorer to view or print the voucher details.

> **Note:** Rain checks issued here are tied to the customer's account and can be looked up at the register when they return to redeem.

![Access the Rain Check section to view issued rain checks](screenshots/reg-007-step13.png)

![Review the rain check voucher details — including the voucher code the customer needs](screenshots/reg-007-step19.png)
    `
  },

  {
    id: 'reg-008',
    title: 'Issue Rain Checks for Multiple Players (One Tee Time)',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.2',
    keywords: ['rain check', 'multiple players', 'group rain check', 'bulk rain check', 'weather', 'voucher', 'group refund'],
    relatedIds: ['reg-007'],
    media: [],
    content: `
## Overview
This covers issuing a single rain check transaction for multiple players on the same tee time — for example, when one payer covered 4 players and the group gets rained out. The system pulls in all players, calculates the refund, and issues vouchers for each.

## Step-by-Step

**Step 1: Open the Tee Time for the Payer**
Locate the tee time where one person paid for all players. Select their tee time to open the options menu.

![Locate the tee time on the Tee Sheet](screenshots/reg-008-step00.png)

**Step 2: Start the Rain Check Process**
Click **Issue Raincheck**. The system automatically pulls in all players on that tee time.

![Click Issue Raincheck — this pulls in all players on the tee time](screenshots/reg-008-step01.png)

**Step 3: Confirm All Players Were Pulled In**
Verify the system shows all players for the tee time (e.g., all 4 players). This happens automatically when you select Issue Raincheck from the group's tee time.

![The system pulls in all players for the tee time](screenshots/reg-008-step02.png)

**Step 4: Update Holes Played for Each Player**
Change the holes played selections to match the group's actual progress. Use the dropdown(s) to select the appropriate number of holes played for each player.

![Use the dropdown to update holes played for each player](screenshots/reg-008-step03.png)

**Step 5: Process the Refund**
Review the updated refund amount shown for the group. Click **Refund**.

![Review the updated refund amount and click Refund](screenshots/reg-008-step10.png)

**Step 6: Select the Rain Check Voucher Option**
Click **Rain Check Voucher**, then click **OK**. The system will print a receipt after you confirm.

![Select Rain Check Voucher and click OK](screenshots/reg-008-step12.png)

**Step 7: Save and Collect Printed Receipts**
Click **Save** to record the rain check. Two receipts will print: a customer copy and a voucher receipt showing the total voucher selected. Provide the printed receipts as needed.

![Save the transaction — two receipts will print for the customer](screenshots/reg-008-step14.png)

**Step 8: Review the Issued Rain Check Vouchers**
Click **Rain Check** to open the rain check management application. Open the rain check details to review the voucher information — including the rain check number and the voucher details for all players in the group.

> **Note:** Selecting Issue Raincheck from the tee time (not an individual name) is what triggers the bulk flow and pulls all players automatically.

![Open the Rain Check application to review issued vouchers](screenshots/reg-008-step15.png)

![Review the voucher details — including the rain check number for all players](screenshots/reg-008-step17.png)
    `
  },

  {
    id: 'reg-010',
    title: 'Day-End Closing Procedures',
    module: 'register',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '2.1',
    keywords: ['close', 'closing', 'end of day', 'day end', 'shift close', 'cash drawer', 'Z report', 'reconcile', 'deposit', 'variance', 'denomination'],
    relatedIds: ['reg-011'],
    media: [],
    content: `
## Overview
The day-end closing procedure reconciles all register transactions and prepares the system for the next business day. This is run at the end of each operating day after the last transaction is processed, by a manager or designated senior staff member.

## Step-by-Step

**Step 1: Open Day End Closing from Tools**
Click **Tools**, then click **Day End Closing**.

![Click Tools to open the menu](screenshots/reg-010-step01.png)

![Click Day End Closing](screenshots/reg-010-step03.png)

**Step 2: Select the Correct Closing Date and User**
Select the correct date, then select the user responsible for closing the drawer/terminal.

![Select the closing date and the user responsible for the close](screenshots/reg-010-step04.png)

**Step 3: Select the POS Terminal**
Select the point of sale terminal you are closing.

![Select the POS terminal to close](screenshots/reg-010-step07.png)

**Step 4: Count Drawer Cash and Enter the Total**
Count all cash in the drawer. Your total should include **everything in the drawer** — the starting balance you began the day with plus all cash received from transactions. Enter this combined total.

![Enter the total cash amount from your drawer count](screenshots/reg-010-step08.png)

**Step 5: Enter Cash Denominations**
Enter each cash denomination amount. Click the denomination buttons to add each to the total. Continue through the cash entry prompts until the full drawer count is entered.

![Enter each bill denomination and click the button to add it to the total](screenshots/reg-010-step10.png)

**Step 6: Save the Cash Count**
Confirm the final counted total in the drawer. Click **Save** to record the total cash amount.

![Confirm the final total and click Save](screenshots/reg-010-step22.png)

**Step 7: Enter Check Totals (If Applicable)**
If you collected checks, enter the total check amount. Click **Add Check** to enter multiple checks if needed. Skip this step if no checks were collected.

![Enter check amounts if any checks were collected](screenshots/reg-010-step24.png)

**Step 8: Close the Day for the Terminal**
Click **Close Day** to finalize the terminal closing process. When prompted, confirm by selecting **Yes**. The system will print a receipt after you confirm.

![Click Close Day to finalize the closing](screenshots/reg-010-step25.png)

![Confirm by selecting Yes — the system will print a receipt](screenshots/reg-010-step26.png)

**Step 9: Review the Day End Receipt PDF**
Open the Day End Receipt PDF. Review the total summary report, including overall sales and gross sales at the bottom, and the reported total cash collected.

![Open the Day End Receipt PDF to review the summary](screenshots/reg-010-step31.png)

![Review the total summary — overall sales, gross sales, and cash collected](screenshots/reg-010-step32.png)

**Step 10: Review Expected vs. Actual Cash and Resolve Variances**
Review the report showing expected drop amount, actual counted amount, any variance, and payment breakdowns. If there is a large variance, recount your cash and bank. Once confirmed, deposit the cash into the safe.

> **Note:** Small variances (e.g., being short $2–3) are generally considered acceptable. The Z-report resets daily totals — once closed, the register is ready for the next day's opening count.

![Review the variance report — expected vs. actual cash and payment breakdowns](screenshots/reg-010-step33.png)
    `
  },

  {
    id: 'reg-011',
    title: 'Issue Rain Checks for Package Groups (HQ)',
    module: 'register',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ['rain check', 'package group', 'HQ', 'prepaid', 'group booking', 'weather refund', 'raincheck voucher', 'credit voucher'],
    relatedIds: ['reg-007', 'reg-008', 'tee-003'],
    media: [],
    content: `
## Overview
Rain checks allow customers who paid for a round but couldn't complete it (due to weather, course conditions, etc.) to receive a voucher for the remaining value of their tee time. The voucher can be redeemed for future golf course credit.

> **IMPORTANT:** Unlike reg-008 (which handles multiple players on one tee time paid by one person), this procedure is for **HQ/package group bookings** where each player must be processed individually. There is no bulk processing option for package groups — for a group of 8 players, you will need to complete this entire process 8 separate times.

## Step-by-Step

**Step 1: Locate the Booking on the Tee Sheet**
Navigate to the **Tee Sheet** and find the booking that requires a rain check. Identify the specific player or group that has paid but needs a rain check due to weather or course conditions.

**Step 2: Select the Booking and Issue Raincheck**
Select the player's booking entry to open the context menu. Click **Issue Raincheck** to begin the rain check process.

![Click Issue Raincheck from the booking context menu](screenshots/reg-011-step01.png)

**Step 3: Confirm Rain Check Issuance**
The **Order Details** panel appears showing the booking information. Click the **Issue Raincheck** button to proceed with the refund process.

![Click Issue Raincheck in the Order Details panel](screenshots/reg-011-step02.png)

**Step 4: Select the Player for Rain Check**
The system displays all players in the booking with their tee time details and costs. Click the **checkbox** next to the specific player's booking entry. You can only process one player at a time.

> **Note:** The system does not support selecting multiple players simultaneously.

![Select the checkbox next to the player receiving the rain check](screenshots/reg-011-step03.png)

**Step 5: Select Number of Holes Played**
Click the **Holes Played** dropdown and select the number of holes the player completed before leaving (0–18). The system automatically calculates the refund amount based on the remaining holes.

> **Note:** Selecting 0 holes provides a full refund. The refund amount decreases proportionally as more holes are played.

![Select how many holes the player completed — the refund amount calculates automatically](screenshots/reg-011-step05.png)

**Step 6: Review Refund Amount and Click Refund**
Review the calculated refund details including **Refund Amount**, **Refund Tax**, and **Total Refund Amount**. Once verified, click **Refund** to proceed.

![Review the refund breakdown and click Refund](screenshots/reg-011-step05.png)

**Step 7: Select Raincheck Voucher as Payment Mode**
In the **Payment Mode** dialog, select **Raincheck Voucher** as the refund method. This creates a voucher that the customer can redeem for future golf course credit.

> **Note:** Other options like Cash, Check, or Refund Voucher may be available, but Raincheck Voucher is the standard method for weather-related cancellations.

![Select Raincheck Voucher as the payment mode](screenshots/reg-011-step07.png)

**Step 8: Confirm and Print the Rain Check Receipt**
Click **OK** to confirm the rain check voucher creation. The system will process the refund and generate the voucher code. Once complete, click **OK** to print the rain check receipt.

![Click OK to print the rain check receipt](screenshots/reg-011-step10.png)

**Step 9: Review the Rain Check Voucher Receipt**
The printed receipt shows the **Credit Voucher Receipt** with all details: recipient name, voucher type (Raincheck), voucher amount, voucher balance, and the unique voucher code (e.g., A61). This code is required for redemption.

> **Note:** Keep a copy of the receipt for your records. The customer will need the voucher code to redeem their credit on a future visit.

![The Credit Voucher Receipt shows the voucher code, amount, and balance](screenshots/reg-011-step13.png)

**Step 10: Repeat Process for Additional Players**
Return to the **Tee Sheet** and select the next player's entry to issue their rain check. When you open the Order Details, previously processed players will show as **Returned** status and cannot be selected again. Select the next eligible player and repeat Steps 5–9.

![Previously processed players show as Returned — select the next eligible player](screenshots/reg-011-step20.png)

![Select the next player and repeat the rain check process](screenshots/reg-011-step21.png)
    `
  },

  {
    id: 'reg-012',
    title: 'Sell a Discounted Gift Card',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.1',
    keywords: ['discount gift card', 'promotional gift card', 'gift card sale', 'gift card discount', 'voucher', 'credit voucher'],
    relatedIds: ['reg-004', 'reg-006'],
    media: [],
    content: `
## Overview
This procedure covers selling a discounted gift card through the register — for example, a customer pays $80 for a $100 gift card. The discount is applied at the register, but the card is loaded with the full face value.

## Important Rules
> **CRITICAL:** When selling a discounted gift card, the gift card **MUST** be the only item in that transaction. Do not include any other products (shirts, golf balls, etc.) in the same transaction — the discount will incorrectly apply to those items as well.

## Step-by-Step

**Step 1: Access the Gift Card Function**
Navigate to **Tools → Register → Gift Card**.

**Step 2: Add Customer Information (Optional)**
At the top of the screen, you'll see a field to tag a customer name. If selling to a specific customer, search for and select their profile. This step is optional but recommended for tracking.

**Step 3: Enter Gift Card Details**
Enter the **Voucher Amount** (e.g., $100 for a hundred-dollar gift card). The **Expiration Date** will auto-populate. Input the gift card number by typing it manually, scanning the barcode, or swiping the magnetic strip (click the **KB (Keyboard Entry) button**, then slide the card on the track).

![Gift card entry form — fill in voucher amount, expiration populates automatically, then enter the card number](screenshots/reg-012-01-credit-voucher-form.png)

**Step 4: Add Gift Card to Register**
Click **Add** to pull the gift card into the register. The gift card will now appear in the transaction.

**Step 5: Apply the Discount**
Locate the pre-populated discount options below the transaction. Click the dropdown menu, select **Gift Card Discount**, and click **Apply**. The applicable discount will be applied to the gift card.

![Gift Card Discount selected — discount applied, Grand Total now reflects the reduced price](screenshots/reg-012-02-discount-applied.png)

**Step 6: Verify Transaction Details**
Review the discount total displayed on screen. Confirm the transaction total reflects the discounted amount (e.g., $80 for a $100 gift card with 20% discount). **Ensure no other items are included in this transaction.**

**Step 7: Process Payment**
Click **Pay**, select the payment method, and enter the payment amount. This should match the **discounted price**, not the gift card value. Complete the transaction.

**Step 8: Verify Gift Card Balance**
After completing the transaction, locate the gift card in the system. Verify the gift card shows the **full voucher amount** (e.g., $100), not the discounted sale price. The customer paid the discounted amount but receives the full gift card value.

## Common Mistakes to Avoid
- Including other products in the transaction — the gift card discount will apply to all items.
- Forgetting to apply the discount — always select and apply before processing payment.
- Using an already-activated gift card number — ensure you're using a new, unused card number.

## Troubleshooting
- If you accidentally add other items, remove them before applying the discount.
- If you forget to apply the discount, void the transaction and start over.
- If a gift card number has already been used, select a different gift card.
    `
  },

  {
    id: 'reg-013',
    title: 'Process a USGA Youth on Course Discount',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.1',
    keywords: ['USGA', 'youth on course', 'YOC', 'junior golf', 'discount', 'youth discount', 'split payment', 'membership ID'],
    relatedIds: ['reg-001'],
    media: [],
    content: `
## Overview
Youth on Course (YOC) is a USGA program offering juniors discounted rounds at participating courses. YOC rounds require a **split payment** — $5 goes to the facility's YOC membership account, and the remainder is charged to the customer's payment method. This is different from a standard round checkout.

## Prerequisites
- Staff must have access to the register system and tee sheet.
- The facility must have a USGA YOC membership ID set up in the system.
- Verify the tee time is properly designated as "USGA YOC 18 Walk" in the booking system.

## Step-by-Step

**Step 1: Identify the Youth on Course Tee Time**
Locate the tee time on the tee sheet. Verify it shows the **"USGA YOC 18 Walk"** designation. Note the player name.

![Tee sheet showing the YOC tee time — verify the USGA Y.O.C. 18 Walk class before pulling to register](screenshots/reg-013-01-yoc-pricing.png)

**Step 2: Pull the Tee Time to Register**
Select the tee time from the tee sheet and pull it through to the register system.

**Step 3: Initiate Split Payment**
Click on **Split Pay** in the register. YOC rounds require $5 to go to the membership account, with the remainder charged to the customer.

**Step 4: Process the $5 Membership Payment**
Select **Membership ID** as the first payment method. Enter **$5** as the amount. Click **Search**, then select your facility's USGA YOC membership ID from the list. Select the applicable facility, click **Done**, then click the **"+"** button to apply that payment.

![Payment modal — select the Membership ID tab to apply the $5 YOC contribution](screenshots/reg-013-02-payment.png)

**Step 5: Verify Remaining Balance**
Check the bottom of the screen to confirm the total paid ($5.00) and the remaining balance the customer owes.

**Step 6: Process Remaining Payment**
Select the customer's preferred payment method (cash, card, etc.). Enter the remaining amount. Click **Pay and Finalize**.

**Step 7: Complete Transaction**
The system processes the transaction and the receipt prints automatically. The $5 is charged to the YOC membership account, and the remainder is charged to the customer's payment method.

## Tips & Tricks
- Always verify the YOC designation on the tee time before processing — regular rounds should not use this workflow.
- The $5 membership charge is fixed — this amount never changes regardless of the total round cost.
- Process the membership payment **first** — always apply the $5 before collecting the customer's payment.
- Watch for the "+" button — it must be clicked to apply the membership payment before proceeding.

## Troubleshooting
- **Can't find the USGA YOC membership ID:** Contact your manager or system administrator to verify it's set up for your facility.
- **Split Pay is grayed out:** Verify the tee time was properly pulled to the register and you have the correct permissions.
- **Wrong amount applied to membership:** If not finalized, remove the payment and re-enter $5. If the transaction is complete, process a refund and re-ring it.
- **Customer payment declined after membership payment applied:** The $5 is already applied — request an alternative payment method. Do not finalize until you've confirmed payment for the remaining balance.
- **Tee time doesn't show "USGA YOC" designation:** Verify with the customer that they are a YOC participant. Contact booking to correct the designation. Do not process as YOC if the designation is not present.
    `
  },

  {
    id: 'reg-014',
    title: 'Sell a Prepaid Pass (Prepaid Package)',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.1',
    keywords: ['prepaid pass', 'prepaid package', 'golf pass', 'punch card', 'multi-round', 'season pass', 'annual pass', 'paid in full', 'class assignment'],
    relatedIds: ['reg-015', 'mem-001'],
    media: [],
    content: `
## Overview
This SOP covers selling prepaid annual passes to both new and existing customers. The process involves setting up the customer profile, configuring their membership class, and processing the full prepaid amount through the register.

## Prerequisites
Before starting, make sure you have all of the following customer information ready: First Name, Last Name, Email Address, Phone Number, Full Street Address, City, State, and ZIP Code. All fields are **required** to sign up a new member — gather this before you begin.

## Step-by-Step

**Step 1: Access Customer Profile**
Navigate to the **Customers** tab. For new customers, click **Create Profile**. For existing customers, use the search function to locate their account. Double-click the customer name to open their profile.

**Step 2: Set Up Member Information**
For **new customers**: Check the "Signup" checkbox at the bottom of the profile — this navigates you to the Member Info tab. For **renewing customers**: Go directly to the Member Info tab (skip the signup checkbox).

**Step 3: Configure Membership Details**
Note the auto-generated member number (no action needed). Select the appropriate class from the dropdown (e.g., "Annual Pass Couple Paid in Full"). Set the **Effective Date** to today. The **Expiration Date** will auto-populate to one year out.

> **CRITICAL:** Ensure **"Pay by Class Assignment by Charge Account"** is turned ON. Click **OK** to apply the class, then click **Save**.

![Add the customer's payment card — set up auto-pay and billing frequency for the prepaid pass](screenshots/reg-014-01-add-payment-card.png)

**Step 4: Process Payment**
Exit the customer profile. Navigate to **Register → Tools → Membership Payment**. Click the magnifying glass icon to search for the customer. New customers will appear at the top of the list; existing customers can be found via the search bar. Select the customer and click **Done**.

![Enter the membership number in the POS to link the prepaid pass to the customer's account](screenshots/reg-014-02-membership-entry.png)

**Step 5: Enter the Correct Payment Amount**

> **WARNING:** The system displays a "Monthly Balance" on this screen — **do NOT use this number.** It only reflects the first month's revenue recognition and is NOT the amount the customer owes. Charging this amount instead of the full prepaid price is a common and costly mistake.

Refer to the **prepaid pricing list at your counter** for the correct full amount. Enter the **full prepaid amount including tax** (e.g., $4,387.25). Click **OK**.

**Step 6: Complete the Transaction**
The full amount will populate in the register. Click **Pay** and select the customer's payment method (cash, check, credit card, etc.). If paying by check, enter the check number and click **OK** to finalize.

## Common Mistakes to Avoid
- Using the monthly balance amount instead of the full prepaid amount.
- Forgetting to turn ON "Pay by Class Assignment by Charge Account."
- Not collecting all required customer information for new members.
- Confusing the new signup process with the renewal process.

## Key Reminders
- **Payment Amount:** Always reference your counter's prepaid pricing list — the system's monthly balance is NOT the correct amount to charge.
- **Dates:** Effective date should always be the day of purchase.
- **New vs. Renewal:** New members need the signup checkbox; renewals go straight to Member Info.
- **Revenue Recognition:** The system automatically handles monthly revenue recognition after you deposit the full prepaid amount.
    `
  },

  {
    id: 'reg-015',
    title: 'Sell a Monthly Membership Pass',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.1',
    keywords: ['monthly pass', 'membership pass', 'monthly membership', 'recurring', 'subscription', 'monthly golf', 'dues', 'sign up', 'member info'],
    relatedIds: ['reg-014', 'mem-001'],
    media: [],
    content: `
## Overview
This SOP covers selling a monthly membership pass to both new and existing customers. Monthly passes charge the customer a recurring fee, and this procedure walks through the full setup from customer profile to first payment.

## Prerequisites
Before proceeding, verify the customer account has **all required fields** completed: First Name, Last Name, Email, Mobile Number, Address, City, State, and ZIP Code. Without these fields, you cannot sell a membership through the system.

## Step-by-Step

**Step 1: Access Customer Account**
Navigate to the **Customers** tab. For new customers, click **Add Customer**. For existing customers, use the search function to find their account. Double-click the customer name (or click the action dots and select "View/Edit") to open their profile.

**Step 2: Access Membership Sign-Up**
For **new members (first-time sign-up)**: Check the **"Sign up for Membership"** checkbox — this automatically navigates to the Member Info tab. For **renewing members**: Click directly on the **Member Info** tab (their existing member number will be retained).

**Step 3: Select Membership Class**
Click **Select Class** and choose the appropriate membership type (e.g., "Couple Monthly"). Set the **Effective Date** to today's date (the sale date). The **Expiration Date** will auto-populate to one year from today.

> **CRITICAL:** Ensure the checkbox labeled **"Post Dues"** is checked — this tells the system to calculate and display the customer's first month's payment amount so you can collect it at the register. If you skip this, the system won't know the customer owes anything. Click **OK** to apply the membership, then click **Save**.

![Membership Class modal — select the strategy, confirm effective and expiration dates, check the dues posting box](screenshots/reg-015-01-membership-class.png)

**Step 4: Process Payment via Register**
Navigate to **Register → Tools → Membership Payment**. Click the magnifying glass icon to search. New members will appear at the top of the list; renewing members can be found via the search bar. Select the customer account and click **Done**.

![Register — Tools — Membership Payment — use the magnifying glass to search, or select the new member at the top](screenshots/reg-015-02-register-cart.png)

**Step 5: Enter Payment Amount**
The system will display the amount owed for the first month's payment. Enter this amount in the Amount box (e.g., $396.49). Click **OK**. The amount will transfer to the register.

**Step 6: Complete Payment**
Click **Pay** and select the customer's payment method (Cash, Check, or Credit Card). If paying by check, enter the check number. Click **OK** to process the payment.

## Common Mistakes to Avoid
- Forgetting to check the "Post Dues" checkbox in Step 3 — without it, the system won't calculate the first payment.
- Not saving the account after adding the membership.
- Missing required customer information fields before starting.
- Confusing the new signup process (checkbox) with the renewal process (go straight to Member Info).

## Key Reminders
- Always verify contact information is complete before starting.
- Double-check the effective date matches the sale date.
- Confirm the dues posting checkbox is selected.
- New members appear at the top of the membership payment list for quick access.

> **Note:** Cancellation procedures for monthly passes require manager approval. Staff cannot cancel without manager authorization.
    `
  },

  // ─── TEE SHEET ─────────────────────────────────────────────────────────────

  {
    id: 'tee-002',
    title: 'Check In Group Reservations and Apply Payment',
    module: 'tee-sheet',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ['group check in', 'group reservation', 'group tee time', 'check in group', 'quickpay', 'check-in plus', 'event charge', 'view check-ins'],
    relatedIds: ['tee-003'],
    media: [],
    content: `
## Overview
This procedure covers how to check in a group reservation on the tee sheet, choose the correct check-in method, take payment, optionally add items to the register cart, charge a group to an event account, and verify check-in counts using View Check-Ins.

There are **three check-in methods** available. Use this quick guide to pick the right one:

- **Check-In Price 1** — Use when the golfer needs to buy add-ons (range balls, merchandise, food) before paying. Opens the register cart so you can add items.
- **QuickPay** — Use for a fast, straightforward check-in with no extras. Skips the register and goes straight to the payment screen.
- **Check-In Plus** — Use when multiple golfers are paying together on one transaction (e.g., one person paying for a foursome).

## Step-by-Step

**Step 1: Confirm the Correct Date**
Before checking in, verify the reservation date matches the day you're checking in.

> **Note:** Checking in early (for example, checking in on January 8th for a January 9th reservation) will record revenue on the wrong date.

![Verify the date on the tee sheet matches today before checking in](screenshots/tee-002-step01.png)

**Step 2: Select the Group Reservation**
Right-click the group reservation on the **Tee Sheet** to view the available check-in options. You'll see three options: Check-In (Price), Check-In QuickPay, and Check-In Plus.

![Right-click the group reservation to see the check-in options](screenshots/tee-002-step02.png)

---

### Option A: Check-In Price 1 (Register/Cart Workflow)

**Step 3A: Select Check-In Price 1**
Select **Check-in Price 1** to check in a single golfer and bring them into the register/cart. This lets you add extras like range balls or merchandise before payment.

![Select Check-In Price 1 to bring the golfer into the register cart](screenshots/tee-002-step07.png)

**Step 4A: Add Items and Take Payment**
Add any additional items to the cart. Select the payment method (cash, credit card, etc.) and click **Pay Exact Amount** to finalize.

![Add items to the cart, then select payment method and pay](screenshots/tee-002-step08.png)

---

### Option B: QuickPay (Bypass Register)

**Step 3B: Select QuickPay**
Select **Check-in QuickPay** (choose the QuickPay price) to bypass the register and go directly to the payment screen. Click **OK** to proceed.

> **Note:** QuickPay is the fastest path — it bypasses the register entirely.

![Select Check-In QuickPay to skip the register and go straight to payment](screenshots/tee-002-step03.png)

**Step 4B: Choose Payment Method and Complete**
Choose the payment method (gift card, credit card, or cash). If paying cash, select **Pay Exact Amount**, then click **OK** to complete the payment.

![Select the payment method — cash shown here — and click Pay Exact Amount](screenshots/tee-002-step05.png)

---

### Option C: Check-In Plus (Multiple Golfers on One Payment)

**Step 3C: Select Check-In Plus**
Right-click the reservation and choose **Check-in Plus**. Enter the number of golfers to include on the payment. If some golfers have already paid, enter only the remaining number.

![Select Check-In Plus to charge multiple golfers on one payment](screenshots/tee-002-step11.png)

**Step 4C: Enter Number of Golfers and Check In**
Enter the number of golfers to include, then click **Check-in**. The group is added to the cart for payment processing.

![Enter the number of golfers and click Check-in](screenshots/tee-002-step12.png)

![The group is added to the cart for payment](screenshots/tee-002-step13.png)

---

### Charging to an Event Account

**Step 5: Charge the Group to an Event Account**
Select the **Event charge** option. Search for the relevant event, select the correct event date, then click **Done**. Click **OK** to acknowledge the charges have been applied to the event account.

> **Note:** This charges the group to an account for final payment later — useful for corporate outings or tournaments.

![Select Event Charge, search for the event, and select the date](screenshots/tee-002-step14.png)

![Select the event date and click Done](screenshots/tee-002-step16.png)

---

### Verifying Check-Ins

**Step 6: View Check-Ins**
Right-click the tee time and select **View Check-Ins** to see a summary of who was checked in, at what price, and who was charged to the account.

![View Check-Ins shows the check-in summary — players, prices, and payment methods](screenshots/tee-002-step19.png)
    `
  },

  {
    id: 'tee-003',
    title: 'Add a Group Booking',
    module: 'tee-sheet',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '1.3',
    keywords: ['group booking', 'group reservation', 'outing', 'corporate outing', 'tournament booking', 'auto select', 'group pricing', 'payment card'],
    relatedIds: ['tee-002', 'reg-011'],
    media: [],
    content: `
## Overview
This procedure covers how to add a group booking on the tee sheet in Club Caddie, including selecting the start time, entering group details, setting group pricing, attaching a customer profile (and optional payment card), and saving the booking.

## Step-by-Step

**Step 1: Start a New Group Booking from the Tee Sheet**
Right-click the desired start time on the tee sheet and select **Add Group Reservation** to open the Group Reservations form.

![Right-click the desired tee time and select Add Group Reservation](screenshots/tee-003-step00.png)

**Step 2: Review Start/End Time Behavior**
The start time defaults to the time where you initiated the booking. The end time is grayed out while **Auto Select** is enabled — Auto Select automatically adjusts the end time based on the number of players you enter in the next step.

![The Group Reservations form — start time is set, end time auto-adjusts](screenshots/tee-003-step01.png)

**Step 3: Enter the Group Name and Number of Golfers**
Enter the group name — this will display on the tee sheet, so include as much detail as you'd like. Then enter the total number of golfers for the booking.

![Enter the group name and number of golfers](screenshots/tee-003-step03.png)

**Step 4: Select Group Price and Adjust if Needed**
Select the group price (e.g., "Outing 18 Ride"). Review the default price — if needed, update it to the correct rate. You can add up to 4 pricing tiers. For example, a corporate outing might have Tier 1 at $75/golfer for employees and Tier 2 at $95/golfer for guests.

![Select the group price tier — you can set up to 4 pricing tiers](screenshots/tee-003-step05.png)

![Adjust the price if the default doesn't match your group rate](screenshots/tee-003-step06.png)

**Step 5: Attach a Customer Profile (Optional)**
Click the **magnifying glass** to open the customer list. Search by last name, click **Search**, select the correct customer, and click **Done**. This links the group booking to a customer profile.

![Click the magnifying glass to search for and attach a customer profile](screenshots/tee-003-step08.png)

![Search by last name, select the customer, and click Done](screenshots/tee-003-step10.png)

**Step 6: Review Customer Profile and Confirm Active Status**
Review the selected individual's profile information. Ensure the profile shows as **Active**. If needed, click the eyeball icon to view or update their details.

![Review the customer profile — confirm it displays as Active](screenshots/tee-003-step13.png)

**Step 7: Add a Payment Card (Optional)**
Click the **Payment** tab. Enter the card information and click **Save** to attach the card to the customer profile for the group booking.

![Click the Payment tab to enter and save a payment card](screenshots/tee-003-step14.png)

**Step 8: Save and Verify the Group Booking**
Click **Save** to finalize and record the group booking. Confirm the group outing displays as successfully created on the tee sheet.

> **Note:** Group bookings should be coordinated with the golf operations manager before confirming. Check cart availability and staff coverage for the booking date.

![Click Save to finalize the group booking](screenshots/tee-003-step16.png)

![Verify the group outing was created on the tee sheet](screenshots/tee-003-step17.png)
    `
  },

  // ─── MEMBERSHIP ────────────────────────────────────────────────────────────

  {
    id: 'mem-001',
    title: 'Sell an RTJ Trail Card Membership',
    module: 'membership',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ['trail card', 'membership', 'trail fee', 'annual membership', 'member setup', 'membership payment', 'sign up for membership'],
    relatedIds: ['reg-014', 'reg-015'],
    media: [],
    content: `
## Overview
This procedure covers how to sell an RTJ Trail Card membership from the tee sheet/POS by locating the customer profile, signing them up for the Trail Card membership, confirming membership dates and pay class, processing the membership fee through Tools, optionally combining tabs into one order, and completing payment with a customer receipt.

## Step-by-Step

**Step 1: Open the Customer Profile from the Tee Sheet/POS**
From the **Tee Sheet and Point of Sale**, double-click into the customer's profile.

![Double-click into the customer's profile from the Tee Sheet](screenshots/mem-001-step00.png)

**Step 2: Search for the Customer (If Needed)**
Click the **magnifying glass** to search for the customer. Click **View Customer Profile** to open the selected customer's details.

![Click the magnifying glass to search for the customer](screenshots/mem-001-step01.png)

![Click View Customer Profile to open their details](screenshots/mem-001-step02.png)

**Step 3: Start the Membership Signup**
Click **Sign Up for Membership**, then scroll down and select **RTJ Trail Card**.

![Click Sign Up for Membership and select RTJ Trail Card](screenshots/mem-001-step03.png)

![Select the RTJ Trail Card membership option](screenshots/mem-001-step04.png)

**Step 4: Add the Membership and Confirm Details**
Add the membership to the profile. Review the auto-filled membership date and expiration date. Under the pay class option, select **"Charge Account"** — this tells the system to bill the membership fee to the customer's account so you can collect payment in the next step. Click **OK** and **Save**.

> **Note:** The system auto-fills the membership and expiration dates. Selecting "Charge Account" is critical so the fee appears in the membership payment tool.

![Confirm membership dates and select Charge Account as the pay class](screenshots/mem-001-step06.png)

**Step 5: Confirm Membership Activation and Rate Update**
Verify the membership now appears in the system. The customer's rate is automatically updated to the Trail Card membership for check-in. When prompted, click **Yes** to confirm the updated membership rate.

![The membership appears in the system — click Yes to confirm the rate update](screenshots/mem-001-step07.png)

**Step 6: Go to Tools and Open Membership Payment**
Navigate to **Tools**, then select **Membership Payment**.

![Navigate to Tools and select Membership Payment](screenshots/mem-001-step09.png)

**Step 7: Search for the Customer to Process Payment**
Click **Search Customer**. Enter the customer profile information, then click **Search**. Select the customer and review the amount due. Enter the membership payment amount, then click **OK** to confirm.

![Search for the customer and review the amount due for the membership](screenshots/mem-001-step12.png)

![Enter the membership payment amount and click OK](screenshots/mem-001-step14.png)

**Step 8: (Optional) Combine Tabs into One Order**
If the customer has multiple items (e.g., tee time + membership) on separate POS tabs, you can combine them into one payment. Right-click within the tab and select **Add to Existing Order** to merge it with the current transaction. Click the customer name to assign the combined order.

> **Note:** "Tabs" here refers to separate order tabs within the POS system (not browser tabs). Combining tabs lets the customer pay for everything in one transaction.

![Right-click the tab and select Add to Existing Order to combine](screenshots/mem-001-step17.png)

**Step 9: Review Booking and Membership Details**
Verify the tee time booking is present at the regular rate plus the membership ID.

![Verify the tee time and membership are both in the cart](screenshots/mem-001-step19.png)

**Step 10: Pay and Print Receipt**
Click **Pay** to begin processing the transaction. Complete payment for the entire transaction (membership + tee time fees). Click **Print Customer Receipt**, then click **OK**. Click **Pay Exact Amount** to finalize.

![Click Pay to process the full transaction — then print the customer receipt](screenshots/mem-001-step21.png)

**Step 11: Confirm the Trail Card Sale is Complete**
Confirm the customer now has the tee time, payment, and membership added in one transaction.

![The Trail Card sale is complete — tee time, payment, and membership all in one transaction](screenshots/mem-001-step25.png)
    `
  },

  {
    id: 'reg-016',
    title: 'Redeem a Gift Card or Credit Voucher',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.0',
    keywords: ['redeem gift card', 'gift card payment', 'credit voucher', 'voucher redemption', 'gift card balance', 'pay with gift card'],
    relatedIds: ['reg-004', 'reg-006', 'reg-012'],
    media: [],
    content: `
## Overview
This procedure covers how to redeem a gift card (credit voucher) as a payment method when a customer is checking out at the register. You can scan the card, type the number in, or search by customer name.

## Step-by-Step

**Step 1: Add Items to the Cart and Click Pay**
Add the item(s) the customer is purchasing to the cart as you normally would, then click **Pay** to begin the payment process. Click **OK** to confirm.

![Add items to the cart, then click Pay](screenshots/reg-016-step00.png)

**Step 2: Select Gift Card / Credit Voucher as Payment**
Click the **Gift Card / Credit Voucher** payment option to begin the redemption process.

![Select Gift Card / Credit Voucher from the payment options](screenshots/reg-016-step02.png)

**Step 3: Enter or Scan the Gift Card**
You have three options to locate the gift card:
- **Scan** the gift card barcode
- **Type** the gift card number directly into the field
- Click the **magnifying glass** to search by gift card number or customer name

![Enter or scan the gift card number — or click the magnifying glass to search](screenshots/reg-016-step06.png)

**Step 4: Search and Select the Gift Card**
If searching, enter the gift card number or customer name. Once the correct card appears in the results, highlight it and click **Done**.

![Search by number or customer name, then select the card and click Done](screenshots/reg-016-step08.png)

**Step 5: Review and Confirm the Gift Card Balance**
The system displays the overall balance remaining on the gift card. Review the amount to confirm it covers the purchase (or note the remaining balance). Click **OK** to apply the gift card to the transaction.

![Review the gift card balance and click OK to apply it](screenshots/reg-016-step10.png)

**Step 6: Complete Payment**
The gift card amount is applied to the transaction. The system prints a receipt that shows the remaining balance on the gift card — hand this to the customer so they know what they have left.

> **Note:** If the gift card balance is less than the transaction total, you'll need to collect the remaining balance using another payment method (cash, credit card, etc.).

![The receipt shows the remaining gift card balance — provide this to the customer](screenshots/reg-016-step12.png)
    `
  },

  {
    id: 'reg-017',
    title: 'Redeem a Raincheck Voucher',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.0',
    keywords: ['redeem raincheck', 'rain check voucher', 'raincheck redemption', 'voucher payment', 'split payment', 'rain check balance'],
    relatedIds: ['reg-007', 'reg-008', 'reg-011'],
    media: [],
    content: `
## Overview
This procedure covers how to redeem a rain check voucher when a customer returns to play. The raincheck value is applied as a payment, and if the new round costs more than the voucher balance, you'll use split pay for the remaining amount.

## Step-by-Step

**Step 1: Check In the Golfer from the Tee Sheet**
Right-click the player's name on the **Tee Sheet** and select **Check-in** to begin the check-in process. This pulls them through to the register.

![Right-click the player's name on the Tee Sheet](screenshots/reg-017-step01.png)

![Select Check-in to pull the player to the register](screenshots/reg-017-step02.png)

**Step 2: Go to Pay and Select Gift Card / Credit Voucher**
Once the player is in the register, click **Pay**. Then click **Gift Card / Credit Voucher** as the payment method — rainchecks are stored as credit vouchers in the system.

![Click Gift Card / Credit Voucher as the payment method](screenshots/reg-017-step04.png)

**Step 3: Access Customer Payment Options**
Click **Customer**, then click **Payment Mode** to access the voucher lookup area.

![Click Customer, then Payment Mode to access the voucher lookup](screenshots/reg-017-step06.png)

**Step 4: Check for Auto-Linked Rainchecks**
Because the customer was pulled in from the tee time, the system may automatically show any rainchecks tied to their profile. If the correct raincheck appears, you can select it directly.

> **Note:** If the auto-linked raincheck shows a balance of zero or isn't the right one, you'll need to search manually in the next step.

![The system may auto-populate rainchecks tied to the customer's profile](screenshots/reg-017-step07.png)

**Step 5: Search for the Raincheck (If Needed)**
Click the **magnifying glass** to search. You can type in a voucher number or search by customer name. Click **Search**, then select the correct raincheck from the results.

![Click the magnifying glass to search by voucher number or customer name](screenshots/reg-017-step08.png)

![Select the correct raincheck from the search results](screenshots/reg-017-step10.png)

**Step 6: Review the Voucher Balance and Confirm**
The system shows the balance of the raincheck voucher. Review the amount and click **OK** to apply it to the transaction.

![Review the raincheck voucher balance and click OK](screenshots/reg-017-step12.png)

**Step 7: Handle Split Payment (If Applicable)**
If the raincheck doesn't fully cover the round, the system will notify you of the remaining balance. Click **Yes** to proceed with split payment. The raincheck value is automatically applied, and the remaining amount appears as the balance due.

> **Example:** If the raincheck balance is $49.05 and the round costs $63.22, the system applies the $49.05 and leaves $14.17 to be paid separately.

![The system shows the raincheck applied and the remaining balance due](screenshots/reg-017-step14.png)

**Step 8: Pay the Remaining Balance**
Select the payment method for the remaining amount (cash, credit card, etc.). Enter the amount and click **OK** to confirm.

![Enter the remaining cash amount and confirm](screenshots/reg-017-step16.png)

**Step 9: Finalize Payment**
Review the transaction. Uncheck receipt boxes if not needed, then click **Pay** to finalize. The raincheck has been redeemed and any remaining balance paid.

![Finalize the payment — the raincheck is redeemed and remaining balance paid](screenshots/reg-017-step22.png)
    `
  },

  {
    id: 'reg-018',
    title: 'Ring Through Prepaid Package Rounds',
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.0',
    keywords: ['prepaid package', 'package round', 'prepaid check-in', 'group check-in', 'membership id', 'reservations account', 'ring through package'],
    relatedIds: ['reg-014', 'tee-002', 'tee-003'],
    media: [],
    content: `
## Overview
This procedure covers how to check in and ring through prepaid package rounds at the register. When a group has a prepaid package booking (like a corporate outing or tournament), their rounds are charged to the facility's reservations account rather than collected at the counter.

> **Important:** Make sure you're selecting your correct facility and the reservations account that belongs to your course.

## Step-by-Step

**Step 1: Locate the Booking on the Tee Sheet**
Find the package group's booking on the **Tee Sheet**. Click into the booking to see the player list.

**Step 2: Select the Players to Check In**
Check the boxes next to the players in the group who are ready to check in (for example, a foursome).

**Step 3: Go to Group Check-In**
Click **Group Check-in** to pull the selected players through to the register.

**Step 4: Go to Pay**
Once the players have been pulled through the register, click **Pay** to begin the payment process.

**Step 5: Select Membership ID**
Select **Membership ID** as the payment method. This is how prepaid package rounds are charged to the facility's reservations account.

**Step 6: Search for the Reservations Account**
Click the **magnifying glass** to search for the reservations account. Each course has its own corporate reservations account for package rounds.

> **Note:** When searching, make sure you're selecting your correct facility and the reservations account that correlates back to your course.

**Step 7: Select the Account and Confirm**
Select the correct reservations account and click **Done**. You'll see the account pulled through to the payment screen. Click **OK** to process the package round to that membership account.

**Step 8: Complete and Print Receipt**
Ring through the transaction and print the receipt. The prepaid package round is now checked in and charged to the correct reservations account.
    `
  },

];

// Export for use by the wiki app
if (typeof module !== 'undefined') {
  module.exports = { articles, MODULES, ROLES };
}
