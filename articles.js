// RTJ Club Caddie Wiki — Article Database
// Each article: { id, title, module, role, content, keywords, relatedIds, dateUpdated, version }
// ONLY articles sourced from RTJ SOPs B (Source of Truth folder) are included.

const MODULES = {
  REGISTER:    { id: 'register',    label: 'Register',    icon: '<i class="fa-solid fa-cash-register"></i>', color: '#1b6d37' },
  TEE_SHEET:   { id: 'tee-sheet',   label: 'Tee Sheet',   icon: '<i class="fa-solid fa-calendar-days"></i>', color: '#0066cc' },
  MEMBERSHIP:  { id: 'membership',  label: 'Membership',  icon: '<i class="fa-solid fa-id-card"></i>', color: '#7d3c98' },
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
    media: [
      { type: 'image', src: 'screenshots/reg-001-01-inventory-management.png', caption: 'Inventory Management screen — use the Add/Manage Items menu to create a new service item', filename: 'reg-001-01-inventory-management.png' },
      { type: 'image', src: 'screenshots/reg-001-02-item-details.png', caption: 'Fill in Sub Department, Category, and item details — then click Save to make it live in the register', filename: 'reg-001-02-item-details.png' },
    ],
    content: `
## Overview
Service (non-stock) items are products that don't require inventory tracking — things like greens fees, cart fees, lessons, or range balls. This procedure walks through adding a new service item in the Club Caddie POS Inventory Center.

## When to Use
- You need to add a brand-new service that doesn't exist in the system yet (e.g., a new greens fee tier, cart rental, or lesson package).
- A seasonal or special service item needs to be made available at the register.

## Step-by-Step

**Step 1: Access Inventory Center**
From the main POS screen, click the **gear icon** in the top-right corner to open the Settings menu. In the left sidebar, click **Inventory Center**. Then click the **ADD ITEM** button in the top-right area to begin creating a new item.

**Step 2: Select Inventory Location**
In the Details tab, set where this item lives in your inventory structure:
- Click the **Department** dropdown and select the appropriate department.
- Click the **Sub-Department** dropdown and select the correct sub-department.
- Click the **Category** dropdown and select the appropriate category.

> **Note:** The Sub-Department is where the "go code" lives. Make sure the item is placed in the correct Sub-Department so it routes correctly in reporting and operations.

**Step 3: Set Item Type to Service**
Under the **Type** dropdown, select **Serv** (Service) to designate this as a non-stock item. A Service item does not track inventory quantities. If the item is a greens fee or cart fee, also select the appropriate **SubType** — this integrates the item with rack rate and class rate management modules.

> **Note:** SubType is only required for greens fees or cart fees. For food & beverage or other service types, leave SubType blank or at the default.

**Step 4: Enter Item Name and Pricing**
Complete the required fields:
- **Item** – Enter the item name (e.g., "Employee Cart").
- **Item Cost** – Enter the cost value (typically 0 for service items).
- **Sale Price** – Enter the selling price.
- **Floor Price** – Enter the minimum allowed price (typically 0).

**Step 5: Configure Loyalty Settings (Optional)**
If this item should earn loyalty points, configure:
- **Loyalty Earned** – Enter the points value.
- **Loyalty Earned Type** – Select the earning method: **Points Per Dollar** (earns 1 point per $1 spent, default) or **Fixed** (earns a specific point value regardless of price).

**Step 6: Select Tax Group**
Click the **Tax Group** dropdown and select the appropriate tax setting — either **Sales Tax** (standard) or **No Sales Tax** (tax-exempt). While not technically required, selecting a Tax Group is strongly recommended to ensure taxes apply correctly when this item is sold.

**Step 7: Save the Service Item**
Review all entered information for accuracy, then click **Save**. The item will now be available in the inventory system and can be added to transactions from the Register.
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
    media: [
      { type: 'image', src: 'screenshots/reg-002-01-inventory-add-item.png', caption: 'Inventory Management — select the item you want to configure as a combo', filename: 'reg-002-01-inventory-add-item.png' },
      { type: 'image', src: 'screenshots/reg-002-02-assembly-items.png', caption: 'Use the Assembly Items panel to search and add the sub-items that make up this combo', filename: 'reg-002-02-assembly-items.png' },
    ],
    content: `
## Overview
Combo items let you bundle multiple products together and sell them as a single unit at a custom price. This is useful for creating packages like a dozen golf balls (4 sleeves), meal deals, or any bundled merchandise. The combo appears as one button in the register, but each component is tracked separately in reports.

## When to Use
- You want staff to ring up bundled offerings with a single button press.
- You're creating product packages (e.g., a dozen golf balls from 4 individual sleeves, a Golf & Cart bundle).

## Step-by-Step

**Step 1: Access Inventory Center**
From the main POS screen, click the **gear icon** in the top-right corner to open the Settings menu. In the left sidebar, click **Inventory Center**. Then click **Add / Manage Items** and select **ADD ITEM** to begin creating a new item.

**Step 2: Select Inventory Location**
Choose where the combo button will appear in your inventory structure:
- Click the **Department** dropdown and select the appropriate department (e.g., Merchandise).
- Click the **Sub-Department** dropdown and select the correct sub-department (e.g., Golf Balls).
- Click the **Category** dropdown and select the category (e.g., Callaway).

**Step 3: Set Type to Combo and Name the Item**
Click the **Type** dropdown and select **Combo**. Enter a descriptive name in the **Item** field (e.g., "Dozen Chrome Soft"). Click **Save** to create the combo item.

> **Note:** The Item Cost, Sales Price, and Floor Price fields will appear grayed out at this stage. This is normal — the combo pricing is calculated from the individual items you add in the next steps.

**Step 4: Open Setup Combo and Add Items**
After saving, click the **Setup Combo** tab at the top. In the Item Search field, type to find items (e.g., "Chrome Soft"), select the item from the dropdown, and click **Add Item**. Repeat to add each unit — for example, add the sleeve item 4 times for a dozen.

> **Note:** Each click of Add Item adds one unit. For a dozen golf balls made up of 4 sleeves, you'd add the sleeve item 4 separate times.

**Step 5: Edit Pricing for Each Item**
In the Assembly Items list, click **Edit** next to each item line. Enter the desired price for that item within the combo (e.g., 12.99) and click **Save**. Repeat for each item line. The total combo price is calculated by adding up all individual item prices.

**Step 6: Review Combo Details and Save**
Click the **Details** tab to review the pre-populated values. Verify the Item Cost, Sales Price, and Floor Price are correct — these are automatically calculated from the items added. Click **Save**, then click **Close**.

> **Note:** Loyalty redemption points and loyalty earned settings are also calculated based on the individual item configurations.

**Step 7: Verify Combo in Register**
Navigate to the **Register** from the main menu. Browse to the category where you placed the combo item. Verify the combo button appears with the correct name and price, and test that clicking it adds the combo to the cart correctly.
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
    media: [
      { type: 'image', src: 'screenshots/reg-004-01-tools-button.png', caption: 'Click the TOOLS button in the POS toolbar to access the gift card configuration menu', filename: 'reg-004-01-tools-button.png' },
      { type: 'image', src: 'screenshots/reg-004-02-gift-card-option.png', caption: 'Select Gift Card from the menu to set the card value and assign it to a customer', filename: 'reg-004-02-gift-card-option.png' },
      { type: 'image', src: 'screenshots/reg-004-03-payment.png', caption: 'Enter the sale amount and click Pay Exact Amount to complete the gift card purchase', filename: 'reg-004-03-payment.png' },
    ],
    content: `
## Overview
This procedure covers selling gift cards from the POS register, including adding a customer (optional), entering the gift card amount, scanning or typing the card number, and completing payment. It also covers how to check a gift card balance and redeem gift cards during checkout.

## Sell a Gift Card

**Step 1: Open the Tools Menu and Select Gift Card**
From the Register screen, click **TOOLS** in the menu bar to open the Tools panel. Then click **Gift Card** under the Gift Vouchers section to open the Generate Credit Voucher form.

**Step 2: Add a Customer (Optional)**
To link the gift card to a specific customer profile, click the **magnifying glass** icon next to Add Customer. Search for and select the customer, then click **Done**. This step is optional — you can skip it if the gift card is not being linked to a customer.

> **Note:** Linking a gift card to a customer allows them to look up their balance by name in the future.

**Step 3: Enter the Gift Card Amount**
In the **Voucher Amount** field, enter the dollar value to load onto the gift card. The system will display the purchase date automatically. If your location uses expiration dates, you can review or set an expiration date in the fields below.

**Step 4: Enter or Scan the Gift Card Number**
Change the **Voucher No** dropdown from "Auto" to **Specified**. This enables the card number entry field. Either scan the physical gift card with a barcode scanner, or manually type the gift card number into the field.

> **Note:** Using "Specified" allows you to assign a specific card number. If left on "Auto," the system generates a random voucher code.

**Step 5: Add the Gift Card to the Sale**
Click the **ADD** button to add the gift card to the transaction. The gift card will appear in the order summary on the right side of the screen showing the voucher amount as the Grand Total.

**Step 6: Complete the Payment**
Click **Pay** to proceed to payment. Select the customer's payment method (Cash, Check, Credit Card, etc.) from the Payment Mode options. For cash payments, enter the amount received or click **Pay Exact Amount**. Ensure **Print Customer Receipt** is checked.

**Step 7: Print and Provide Receipts to Customer**
Click **OK** or **Close** to complete the transaction. The system prints a credit customer receipt plus a voucher receipt containing the gift card number. Give both receipts to the customer — they can attach the voucher receipt to the physical gift card for reference.

> **Note:** The voucher receipt contains the gift card number needed for redemption. Always provide this to the customer.

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
    media: [
      { type: 'image', src: 'screenshots/reg-006-01-select-voucher.png', caption: 'The Select Voucher screen lists all gift cards — search by number, name, or date', filename: 'reg-006-01-select-voucher.png' },
      { type: 'image', src: 'screenshots/reg-006-02-voucher-details.png', caption: 'Open a voucher to see its type, balance, and status — then click Save to confirm', filename: 'reg-006-02-voucher-details.png' },
    ],
    content: `
## Overview
There are several ways to search and verify a gift card balance in Club Caddie — from the Tools menu, during checkout, or through the Vouchers module. This article covers all the methods available.

## Method 1: Check Voucher Balance (Tools Menu)

**Step 1: Open Check Voucher Balance**
Go to **Tools**, then click **Check Voucher Balance**.

**Step 2: Search by Gift Card Number or Customer Last Name**
In the Check Voucher Balance screen, either type the gift card number and click **Search**, or search by the customer's last name.

> **Note:** Searching by last name can pull up rain checks or gift cards tied to that customer.

**Step 3: View the Balance**
Review the returned gift card and its current balance. Click **Clear Search** to remove the previous search before searching again.

## Method 2: Search Customer Name / Voucher No.

**Step 4: Use the Search Customer Name, Voucher No. Option**
Click **Search Customer Name, Voucher No.** Enter the customer's last name, then locate and select the correct search result. This is another way to pull up customer-tied rain checks or gift cards to verify the balance.

## Method 3: Check Balance During Checkout

**Step 5: Search a Gift Card Balance While Paying for an Item**
Start a sale by selecting a merchandise area and an item. Click **Pay**, then click **OK**. When prompted with **Gift card credit voucher**, click **OK**.

**Step 6: Search for the Gift Card from the Checkout Prompt**
Click into the gift card search area, then use **Search Customer Name, Voucher No.** Enter the gift card number, click **Search**, and review the balance.

## Method 4: Vouchers Module (Detailed Usage)

**Step 7: Use the Vouchers Module**
Click **Vouchers**, then click **Gift Card**. Search by voucher number as needed. Click **Usage** to view detailed gift card activity and transaction history.

> **Note:** The Vouchers module shows all details and usage for gift cards, including when actions occurred. You can drill down to a receipt-level view.
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
    media: [
        { type: 'image', src: 'screenshots/reg-007-01-tee-sheet.png', caption: 'Locate the player on the Tee Sheet — click into their booking to access rain check options', filename: 'reg-007-01-tee-sheet.png' },
        { type: 'image', src: 'screenshots/reg-007-02-order-details.png', caption: 'Order Details panel shows the refund breakdown — holes played, amounts, and credit to be issued', filename: 'reg-007-02-order-details.png' },
        { type: 'image', src: 'screenshots/reg-007-03-credit-voucher.png', caption: 'The Credit Voucher receipt — print or email this to the customer as their rain check', filename: 'reg-007-03-credit-voucher.png' },
      { type: 'video', url: 'https://clubcaddie-university.com', title: 'Issue a Rain Check — Training Video', duration: '3 min' },
    ],
    content: `
## Overview
Use this procedure to issue a rain check voucher for one player from their tee sheet check-in. You'll select holes played to calculate the refund amount, complete the voucher/refund flow, print the voucher receipt, and locate the issued rain check record.

## When to Use
- A customer's round is cut short due to rain or inclement weather.
- A manager has authorized a rain check for a single player.

## Step-by-Step

**Step 1: Locate the Player and Open Their Profile**
Find the player on the tee sheet/check-in list. Right-click the player profile, then click **Issue Rain Check**.

**Step 2: Set the Holes Played**
The rain check interface opens. Select the tee time and specify how many holes have been completed (e.g., select 9 holes) so the refund amount updates accordingly.

**Step 3: Start the Refund**
Click the **Refund** option to begin processing the rain check. Confirm the refund selection by clicking the confirmation button.

**Step 4: Choose the Rain Check Voucher Option**
Select **Rain Check Voucher**. You may leave the Voucher field blank — the system will auto-populate an item/receipt. Click **OK**.

**Step 5: Select the POS Terminal**
Click the POS terminal associated with the player's transaction to continue.

**Step 6: Print and Save**
Continue through the prompts to prepare the voucher receipt. Print the rain check receipt/voucher for the player. Click **Save** to record the transaction. Confirm the receipt printed successfully by clicking **Yes**.

**Step 7: Review the Rain Check Record**
Click the **Rain Check** section to view issued rain checks. Click the correct entry to open the record details. You can also open the rain check PDF from File Explorer to view or print the voucher details.

> **Note:** Rain checks issued here are tied to the customer's account and can be looked up at the register when they return to redeem.
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
    media: [
      { type: 'image', src: 'screenshots/reg-008-01-order-details-multi.png', caption: 'Order Details shows each player\'s green fee breakdown — select the ones receiving rain checks', filename: 'reg-008-01-order-details-multi.png' },
      { type: 'image', src: 'screenshots/reg-008-02-issue-voucher.png', caption: 'Click to issue credit vouchers for the selected players in the group', filename: 'reg-008-02-issue-voucher.png' },
    ],
    content: `
## Overview
This covers issuing a single rain check transaction for multiple players on the same tee time — for example, when one payer covered 4 players and the group gets rained out. The system pulls in all players, calculates the refund, and issues vouchers for each.

## Step-by-Step

**Step 1: Open the Tee Time for the Payer**
Locate the tee time where one person paid for all players. Right-click into their tee time.

**Step 2: Start the Rain Check Process**
Click **Issue Raincheck**. The system automatically pulls in all players on that tee time.

**Step 3: Confirm All Players Were Pulled In**
Verify the system shows all players for the tee time (e.g., all 4 players). This happens automatically when you select Issue Raincheck from the group's tee time.

**Step 4: Update Holes Played for Each Player**
Change the holes played selections to match the group's actual progress. Use the dropdown(s) to select the appropriate number of holes played for each player.

**Step 5: Process the Refund**
Review the updated refund amount shown for the group. Click **Refund**.

**Step 6: Confirm the Refund Action**
Click the confirmation option to proceed.

**Step 7: Select the Rain Check Voucher Option**
Click **Rain Check Voucher**, then click **OK**. The system will print a receipt after you confirm.

**Step 8: Save the Rain Check Transaction**
Click **Save** to record the rain check.

**Step 9: Collect and Distribute the Printed Receipts**
Two receipts will print: a customer copy and a voucher receipt showing the total voucher selected. Provide the printed receipts as needed.

**Step 10: Review the Issued Rain Check Vouchers**
Click **Rain Check** to open the rain check management application. Open the rain check details to review the voucher information — including the rain check number and the voucher details for all players in the group.

> **Note:** Selecting Issue Raincheck from the tee time (not an individual name) is what triggers the bulk flow and pulls all players automatically.
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
    media: [
      { type: 'image', src: 'screenshots/reg-010-01-day-end-button.png', caption: 'Click Day End Closing from the POS toolbar — only run this after the last transaction of the day', filename: 'reg-010-01-day-end-button.png' },
      { type: 'image', src: 'screenshots/reg-010-02-cash-count.png', caption: 'Enter the actual bill count by denomination in the Cash Amount screen', filename: 'reg-010-02-cash-count.png' },
      { type: 'image', src: 'screenshots/reg-010-03-day-end-report.png', caption: 'The Day End Receipt breaks down all transactions by category for final reconciliation', filename: 'reg-010-03-day-end-report.png' },
    ],
    content: `
## Overview
The day-end closing procedure reconciles all register transactions and prepares the system for the next business day. This is run at the end of each operating day after the last transaction is processed, by a manager or designated senior staff member.

## Step-by-Step

**Step 1: Open Day End Closing from Tools**
Click **Tools**, then click **Day End Closing**.

**Step 2: Select the Correct Closing Date and User**
Select the correct date, then select the user responsible for closing the drawer/terminal.

**Step 3: Count Drawer Cash and Enter the Total**
Count all cash in the drawer **including the starting balance**. Enter the total as "starting balance + counted cash." Click **Enter Exact Amount** to confirm.

**Step 4: Enter Cash Denominations**
Enter each cash denomination amount. Click the denomination buttons to add each to the total. Continue through the cash entry prompts until the full drawer count is entered.

**Step 5: Save the Cash Count**
Confirm the final counted total in the drawer. Click **Save** to record the total cash amount.

**Step 6: Enter Check Totals (If Applicable)**
If you collected checks, enter the total check amount. Click **Add Check** to enter multiple checks if needed. Skip this step if no checks were collected.

**Step 7: Close the Day for the Terminal**
Click **Close Day** to finalize the terminal closing process. When prompted, confirm by selecting **Yes**. The system will print a receipt after you confirm.

**Step 8: Print and Confirm the Closing Receipt**
Collect the printed Day End Closing receipt from the printer. Click **Save** to confirm the receipt was received.

**Step 9: Review the Day End Receipt PDF**
Open the Day End Receipt PDF. Review the total summary report, including overall sales and gross sales at the bottom, and the reported total cash collected.

**Step 10: Review Expected vs. Actual Cash and Resolve Variances**
Review the report showing expected drop amount, actual counted amount, any variance, and payment breakdowns. If there is a large variance, recount your cash and bank. Once confirmed, deposit the cash into the safe.

> **Note:** Small variances (e.g., being short $2–3) are generally considered acceptable. The Z-report resets daily totals — once closed, the register is ready for the next day's opening count.
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
    media: [
      { type: 'image', src: 'screenshots/reg-011-01-order-details-package.png', caption: 'Order Details for a package group — each line shows the bundled items and pricing per player', filename: 'reg-011-01-order-details-package.png' },
      { type: 'image', src: 'screenshots/reg-011-02-credit-voucher-receipt.png', caption: 'The Credit Voucher Receipt is generated for each player — print or email as their rain check', filename: 'reg-011-02-credit-voucher-receipt.png' },
    ],
    content: `
## Overview
Rain checks allow customers who paid for a round but couldn't complete it (due to weather, course conditions, etc.) to receive a voucher for the remaining value of their tee time. The voucher can be redeemed for future golf course credit.

> **IMPORTANT:** Rain checks must be processed individually for each player in the booking — there is no bulk processing option available. For a group of 8 players, you will need to complete this entire process 8 separate times.

## Step-by-Step

**Step 1: Locate the Booking on the Tee Sheet**
Navigate to the **Tee Sheet** and find the booking that requires a rain check. Identify the specific player or group that has paid but needs a rain check due to weather or course conditions.

**Step 2: Right-Click and Select Issue Raincheck**
Right-click on the player's booking entry to open the context menu. Click **Issue Raincheck** to begin the rain check process.

**Step 3: Confirm Rain Check Issuance**
The **Order Details** panel appears showing the booking information. Click the **Issue Raincheck** button to proceed with the refund process.

**Step 4: Select the Player for Rain Check**
The system displays all players in the booking with their tee time details and costs. Click the **checkbox** next to the specific player's booking entry. You can only process one player at a time.

> **Note:** The system does not support selecting multiple players simultaneously.

**Step 5: Select Number of Holes Played**
Click the **Holes Played** dropdown and select the number of holes the player completed before leaving (0–18). The system automatically calculates the refund amount based on the remaining holes.

> **Note:** Selecting 0 holes provides a full refund. The refund amount decreases proportionally as more holes are played.

**Step 6: Review Refund Amount and Click Refund**
Review the calculated refund details including **Refund Amount**, **Refund Tax**, and **Total Refund Amount**. Once verified, click **Refund** to proceed.

**Step 7: Select Raincheck Voucher as Payment Mode**
In the **Payment Mode** dialog, select **Raincheck Voucher** as the refund method. This creates a voucher that the customer can redeem for future golf course credit.

> **Note:** Other options like Cash, Check, or Refund Voucher may be available, but Raincheck Voucher is the standard method for weather-related cancellations.

**Step 8: Confirm Voucher Creation**
Click **OK** to confirm the rain check voucher creation. The system will process the refund and generate the voucher code.

**Step 9: Print the Rain Check Receipt**
The system processes the refund (shown as "Processing, please wait"). Once complete, click **OK** to print the rain check receipt. The receipt includes the recipient's name, voucher type, voucher amount, balance, and unique voucher code.

**Step 10: Review the Rain Check Voucher Receipt**
The printed receipt shows the **Credit Voucher Receipt** with all details: recipient name, voucher type (Raincheck), voucher amount, voucher balance, and the unique voucher code (e.g., A61). This code is required for redemption.

> **Note:** Keep a copy of the receipt for your records. The customer will need the voucher code to redeem their credit on a future visit.

**Step 11: Repeat Process for Additional Players**
Return to the **Tee Sheet** and right-click on the next player's entry to issue their rain check. When you open the Order Details, previously processed players will show as **Returned** status and cannot be selected again. Select the next eligible player and repeat Steps 5–10.
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
    media: [
      { type: 'image', src: 'screenshots/reg-012-01-credit-voucher-form.png', caption: 'Gift card entry form — fill in voucher amount, expiration populates automatically, then enter the card number', filename: 'reg-012-01-credit-voucher-form.png' },
      { type: 'image', src: 'screenshots/reg-012-02-discount-applied.png', caption: 'Gift Card Discount selected — discount applied, Grand Total now reflects the reduced price', filename: 'reg-012-02-discount-applied.png' },
    ],
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
Enter the **Voucher Amount** (e.g., $100 for a hundred-dollar gift card). The **Expiration Date** will auto-populate. Input the gift card number by typing it manually, scanning the barcode, or swiping the magnetic strip (click the KB button, then slide the card on the track).

**Step 4: Add Gift Card to Register**
Click **Add** to pull the gift card into the register. The gift card will now appear in the transaction.

**Step 5: Apply the Discount**
Locate the pre-populated discount options below the transaction. Click the dropdown menu, select **Gift Card Discount**, and click **Apply**. The applicable discount will be applied to the gift card.

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
    media: [
      { type: 'image', src: 'screenshots/reg-013-01-yoc-pricing.png', caption: 'Tee sheet showing the YOC tee time — verify the "USGA Y.O.C. 18 Walk" class before pulling to register', filename: 'reg-013-01-yoc-pricing.png' },
      { type: 'image', src: 'screenshots/reg-013-02-payment.png', caption: 'Payment modal — select the Membership ID tab to apply the $5 YOC contribution', filename: 'reg-013-02-payment.png' },
    ],
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

**Step 2: Pull the Tee Time to Register**
Select the tee time from the tee sheet and pull it through to the register system.

**Step 3: Initiate Split Payment**
Click on **Split Pay** in the register. YOC rounds require $5 to go to the membership account, with the remainder charged to the customer.

**Step 4: Process the $5 Membership Payment**
Select **Membership ID** as the first payment method. Enter **$5** as the amount. Click **Search**, then select your facility's USGA YOC membership ID from the list. Select the applicable facility, click **Done**, then click the **"+"** button to apply that payment.

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
    media: [
      { type: 'image', src: 'screenshots/reg-014-01-add-payment-card.png', caption: 'Add the customer\'s payment card — set up auto-pay and billing frequency for the prepaid pass', filename: 'reg-014-01-add-payment-card.png' },
      { type: 'image', src: 'screenshots/reg-014-02-membership-entry.png', caption: 'Enter the membership number in the POS to link the prepaid pass to the customer\'s account', filename: 'reg-014-02-membership-entry.png' },
    ],
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

**Step 4: Process Payment**
Exit the customer profile. Navigate to **Register → Tools → Membership Payment**. Click the magnifying glass icon to search for the customer. New customers will appear at the top of the list; existing customers can be found via the search bar. Select the customer and click **Done**.

**Step 5: Enter the Correct Payment Amount**
The system will show a "Monthly Balance" on screen — **IGNORE this amount.** It only shows the first month's revenue recognition, NOT the full prepaid amount. Refer to the **prepaid pricing list** at your counter for the correct full amount. Enter the **full prepaid amount including tax** (e.g., $4,387.25). Click **OK**.

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
    media: [
      { type: 'image', src: 'screenshots/reg-015-01-membership-class.png', caption: 'Membership Class modal — select the strategy, confirm effective and expiration dates, check the dues posting box', filename: 'reg-015-01-membership-class.png' },
      { type: 'image', src: 'screenshots/reg-015-02-register-cart.png', caption: 'Register → Tools → Membership Payment — use the magnifying glass to search, or select the new member at the top', filename: 'reg-015-02-register-cart.png' },
    ],
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

> **CRITICAL:** Ensure the checkbox is checked to **post the dues to the account** — this displays what they owe for the first month's payment. Click **OK** to apply the membership, then click **Save**.

**Step 4: Process Payment via Register**
Navigate to **Register → Tools → Membership Payment**. Click the magnifying glass icon to search. New members will appear at the top of the list; renewing members can be found via the search bar. Select the customer account and click **Done**.

**Step 5: Enter Payment Amount**
The system will display the amount owed for the first month's payment. Enter this amount in the Amount box (e.g., $396.49). Click **OK**. The amount will transfer to the register.

**Step 6: Complete Payment**
Click **Pay** and select the customer's payment method (Cash, Check, or Credit Card). If paying by check, enter the check number. Click **OK** to process the payment.

## Common Mistakes to Avoid
- Forgetting to check the "post dues" checkbox in Step 3.
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
    media: [
      { type: 'image', src: 'screenshots/tee-002-01-context-menu.png', caption: 'Right-click the group reservation on the Tee Sheet to see check-in and payment options', filename: 'tee-002-01-context-menu.png' },
      { type: 'image', src: 'screenshots/tee-002-02-checkin-options.png', caption: 'The expanded menu shows Check In, Quick Pay, and View Check-Ins options for the group', filename: 'tee-002-02-checkin-options.png' },
    ],
    content: `
## Overview
This procedure covers how to check in a group reservation on the tee sheet, choose the correct check-in method, take payment, optionally add items to the register cart, charge a group to an event account, and verify check-in counts using View Check-Ins.

There are **three check-in methods** available: Check-In Price 1 (register/cart workflow), QuickPay (bypass the register), and Check-In Plus (multiple golfers on one payment).

## Step-by-Step

**Step 1: Confirm the Correct Date**
Before checking in, verify the reservation date matches the day you're checking in.

> **Note:** Checking in early (for example, checking in on January 8th for a January 9th reservation) will record revenue on the wrong date.

**Step 2: Right-Click the Group Reservation**
Right-click the group reservation on the **Tee Sheet** to view the available check-in options.

---

### Option A: Check-In Price 1 (Register/Cart Workflow)

**Step 3A: Select Check-In Price 1**
Select **Check-in Price 1** to check in a single golfer and bring them into the register/cart.

**Step 4A: Add Items and Take Payment**
Add any additional items to the cart (for example, range balls or merchandise). Select the payment method (cash, credit card, etc.) and click **Pay Exact Amount** to finalize.

> **Note:** Use this option when you want the golfer in the cart so you can sell add-ons before payment.

---

### Option B: QuickPay (Bypass Register)

**Step 3B: Select QuickPay**
Select **Check-in QuickPay** (choose the QuickPay price) to bypass the register and go directly to the payment screen. Click **OK** to proceed.

**Step 4B: Choose Payment Method and Complete**
Choose the payment method (gift card, credit card, or cash). If paying cash, select **Pay Exact Amount**, then click **OK** to complete the payment.

> **Note:** QuickPay is a faster path because it bypasses the register entirely.

---

### Option C: Check-In Plus (Multiple Golfers on One Payment)

**Step 3C: Select Check-In Plus**
Right-click the reservation and select **Check-in Plus**. Enter the number of golfers to include on the payment. If some golfers have already paid, enter the remaining number.

**Step 4C: Assign Rates and Check In**
Update the list to assign rates if multiple rates apply, then click **Check-in**.

> **Note:** Use this option when you want multiple golfers on one payment.

---

### Charging to an Event Account

**Step 5: Charge the Group to an Event Account**
Select the **Event charge** option. Search for the relevant event, select the correct event date, then click **Done**. Click **OK** to acknowledge the charges have been applied to the event account.

> **Note:** This is a way to charge the group to an account for final payment later.

---

### Verifying Check-Ins

**Step 6: View Check-Ins**
Right-click on the tee sheet and select **View Check-Ins**. Review the summary of who was checked in at a price and who was charged to the account.
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
    media: [
        { type: 'image', src: 'screenshots/tee-003-01-group-form.png', caption: 'Group Reservations form — set start time, number of golfers, and pricing for up to 4 group tiers', filename: 'tee-003-01-group-form.png' },
        { type: 'image', src: 'screenshots/tee-003-02-group-form-completed.png', caption: 'Fill in all the group details — name, golfers, pricing — assign a customer, then click Save', filename: 'tee-003-02-group-form-completed.png' },
      { type: 'video', url: 'https://clubcaddie-university.com', title: 'Add a Group Booking — Training Video', duration: '4 min' },
    ],
    content: `
## Overview
This procedure covers how to add a group booking on the tee sheet in Club Caddie, including selecting the start time, entering group details, setting group pricing, attaching a customer profile (and optional payment card), and saving the booking.

## Step-by-Step

**Step 1: Start a New Group Booking from the Tee Sheet**
Right-click the desired tee time (start time), then click **Add Group Reservation**.

**Step 2: Review Start/End Time Behavior**
The start time defaults to the time where you initiated the booking. The end time is grayed out while **Auto Select** is enabled — Auto Select will automatically adjust the end time based on the number of players you enter in the next step.

**Step 3: Enter the Group Name**
Enter the group name. This will display on the tee sheet, so include as much detail as you'd like.

**Step 4: Enter the Number of Golfers**
Enter the total number of golfers for the group booking.

**Step 5: Select Group Price and Adjust if Needed**
Select the group price (e.g., "Outing 18 Ride"). Review the default price — if needed, update the price to the correct rate. You can also select additional pricing options if the group has multiple tiers (up to 4 pricing options are available).

**Step 6: Attach a Customer Profile (Optional)**
Click the magnifying glass to open the customer list. Search by last name, then click **Search**. Select the correct customer name and click **Done**.

**Step 7: Review the Customer Profile**
Review that the selected individual is added to the profile. If needed, click the eyeball icon to return to the profile to verify or update their information.

**Step 8: Confirm the Profile is Active**
Ensure the customer profile displays as **Active**.

**Step 9: Add a Payment Card (Optional)**
Click the **Payment** tab. Enter the card information, then click **Save**. This attaches the card to the customer profile for the group booking.

**Step 10: Save the Group Booking**
Click **Save** to finalize and record the group booking.

**Step 11: Verify the Group Outing Was Created**
Confirm the group outing displays as successfully created on the tee sheet.

> **Note:** Group bookings should be coordinated with the golf operations manager before confirming. Check cart availability and staff coverage for the booking date.
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
    media: [
      { type: 'image', src: 'screenshots/mem-001-01-customer-profile.png', caption: 'Open the customer\'s profile and go to the Member Info tab to assign a membership class', filename: 'mem-001-01-customer-profile.png' },
      { type: 'image', src: 'screenshots/mem-001-02-membership-class.png', caption: 'The Membership Class dialog lets you select the plan tier, effective date, and billing strategy', filename: 'mem-001-02-membership-class.png' },
      { type: 'image', src: 'screenshots/mem-001-03-member-contract.png', caption: 'Add the Member Contract item to the cart to complete the membership enrollment', filename: 'mem-001-03-member-contract.png' },
    ],
    content: `
## Overview
This procedure covers how to sell an RTJ Trail Card membership from the tee sheet/POS by locating the customer profile, signing them up for the Trail Card membership, confirming membership dates and pay class, processing the membership fee through Tools, optionally combining tabs into one order, and completing payment with a customer receipt.

## Step-by-Step

**Step 1: Open the Customer Profile from the Tee Sheet/POS**
From the **Tee Sheet and Point of Sale**, double-click into the customer's profile.

**Step 2: Search for the Customer (If Needed)**
Click the **magnifying glass** to search for the customer. Click **View Customer Profile** to open the selected customer's details.

**Step 3: Start the Membership Signup**
Click **Sign Up for Membership**, then scroll down and select **RTJ Trail Card**.

**Step 4: Add the Membership and Confirm Details**
Add the membership to the profile (the system will automatically book the correct date). Review the auto-filled membership date and expiration date. Assign the pay class by **charge account**, then click **OK** and **Save**.

> **Note:** The system auto-fills the membership and expiration dates.

**Step 5: Confirm Membership Activation and Rate Update**
Verify the membership now appears in the system and the customer's rate is updated to the Trail Card membership for check-in. When prompted, click **Yes** to confirm the updated membership rate.

**Step 6: Go to Tools and Open Membership Payment**
Navigate to **Tools**, then select **Membership Payment**.

**Step 7: Search for the Customer to Process Payment**
Click **Search Customer**. Enter the customer profile information, then click **Search**. Select the customer and review the amount due. Enter the membership payment amount, then click **OK** to confirm.

**Step 8: (Optional) Combine Tabs into One Order**
Right-click to open additional payment options in a new tab. Right-click within the tab and select **Add to Existing Order** to combine tabs. Click the customer name to assign the combined order as number one.

> **Note:** This combines payment tabs so everything can be paid together.

**Step 9: Review Booking and Membership Details**
Verify the tee time booking is present at the regular rate plus the membership ID.

**Step 10: Pay and Print Receipt**
Click **Pay** to begin processing the transaction. Complete payment for the entire transaction (membership + tee time fees). Click **Print Customer Receipt**, then click **OK**. Click **Pay Exact Amount** to finalize.

**Step 11: Confirm the Trail Card Sale is Complete**
Confirm the customer now has the tee time, payment, and membership added in one transaction.
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

**Step 1: Add Items to the Cart**
Add the item(s) the customer is purchasing to the cart as you normally would, then click **Pay** to begin the payment process.

**Step 2: Confirm and Proceed**
Click **OK** to confirm the current action and proceed with the transaction.

**Step 3: Select Gift Card / Credit Voucher as Payment**
Click the **Gift Card / Credit Voucher** payment option to begin the redemption process.

**Step 4: Access the Customer Section**
Click the **Customer** button to access customer-related options and information. If you want to print a customer receipt, click **Print Customer Receipt**.

**Step 5: Enter or Scan the Gift Card**
You have three options to locate the gift card:
- **Scan** the gift card barcode
- **Type** the gift card number directly into the field
- Click the **magnifying glass** to search by gift card number or customer name

**Step 6: Search and Select the Gift Card**
If searching, enter the gift card number or customer name. Once the correct card appears in the results, highlight it and click **Done**.

**Step 7: Review the Gift Card Balance**
The system displays the overall balance remaining on the gift card. Review the amount to confirm it covers the purchase (or note the remaining balance), then click **OK**.

**Step 8: Confirm the Balance**
Click **OK** to confirm the gift card balance and continue with payment.

**Step 9: Complete Payment**
The gift card amount is applied to the transaction. The system prints a receipt that shows the remaining balance on the gift card — hand this to the customer so they know what they have left.

> **Note:** If the gift card doesn't fully cover the transaction, you'll need to collect the remaining balance using another payment method (cash, credit card, etc.).
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
Right-click the player's name on the **Tee Sheet** and select **Check-in** to begin the check-in process.

**Step 2: Go to Pay in the Register**
Once the player has been pulled through to the register, click **Pay** to start processing payment.

**Step 3: Select Gift Card / Credit Voucher**
Click **Gift Card / Credit Voucher** as the payment method. This is the same option used for gift cards — rainchecks are stored as credit vouchers in the system.

**Step 4: Access Customer Payment Options**
Click **Customer**, then click **Payment Mode** to access the voucher lookup.

**Step 5: Check for Auto-Linked Rainchecks**
Because the customer was pulled in from the tee time, the system may automatically show any rainchecks tied to their profile. If the correct raincheck appears, you can select it directly.

> **Note:** If the auto-linked raincheck shows a balance of zero or isn't the right one, you'll need to search manually.

**Step 6: Search for the Raincheck (If Needed)**
Click the **magnifying glass** to search. You can type in a voucher number or search by customer name. Click **Search**, then select the correct raincheck from the results.

**Step 7: Review the Voucher Balance**
The system shows the balance of the raincheck voucher. Click **OK** to confirm.

**Step 8: Handle Split Payment (If Applicable)**
If the raincheck doesn't fully cover the round, the system will notify you of the remaining balance. Click **Yes** to proceed with split payment. The raincheck value is automatically applied, and the remaining balance will need to be paid with another method.

> **Example:** If the raincheck balance is $49.05 and the round costs $63.22, the system applies the $49.05 and leaves $14.17 to be paid separately.

**Step 9: Pay the Remaining Balance**
Select the payment method for the remaining amount (cash, credit card, etc.). Enter the amount and click **OK** to confirm.

**Step 10: Finalize Payment**
Review the transaction, then click **Pay** to finalize. The raincheck has been redeemed and any remaining balance paid.
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
