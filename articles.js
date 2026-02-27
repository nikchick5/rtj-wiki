// RTJ Club Caddie Wiki — Article Database
// Each article: { id, title, module, role, content, keywords, relatedIds, dateUpdated, version }
// ONLY articles sourced from RTJ SOPs B (Source of Truth folder) are included.

const MODULES = {
  REGISTER: {
    id: 'register',
    label: 'Register',
    icon: '<i class="fa-solid fa-cash-register"></i>',
    color: '#1b6d37',
    description: "Ring up sales, process gift cards, issue rain checks, manage inventory items, and handle day-end register procedures.",
  },
  TEE_SHEET: {
    id: 'tee-sheet',
    label: 'Tee Sheet',
    icon: '<i class="fa-solid fa-calendar-days"></i>',
    color: '#0066cc',
    description: "Check in golfers, manage group bookings, and handle tee time operations from the tee sheet.",
  },
  MEMBERSHIP: {
    id: 'membership',
    label: 'Membership',
    icon: '<i class="fa-solid fa-id-card"></i>',
    color: '#7d3c98',
    description: "Set up trail cards, manage member profiles, and configure membership programs and benefits.",
  },
  FB_APP: {
    id: 'fb-app',
    label: 'Food & Beverage App',
    icon: '<i class="fa-solid fa-utensils"></i>',
    color: '#e67e22',
    description: "Take orders, manage tabs, process payments, and handle meal coursing on the Club Caddie F&B tablet app.",
  },
  INVENTORY: {
    id: 'inventory',
    label: 'Inventory',
    icon: '<i class="fa-solid fa-boxes-stacked"></i>',
    color: '#2c8c99',
    description: "Receive merchandise using purchase orders, handle non-PO deliveries, run inventory counts, and print count sheets.",
  },
  ONE_SHEETS: {
    id: 'one-sheets',
    label: 'RTJ One Sheets',
    icon: '<i class="fa-solid fa-file-pdf"></i>',
    color: '#c0392b',
    description: "Printable quick-reference guides — one page per procedure. Download, print, and keep at your station.",
  },
};

const ONE_SHEETS = [
  {
    "id": "os-001",
    "title": "Add a Service Item",
    "description": "Create a new service item in Inventory Center — type, pricing, tax, and loyalty settings.",
    "steps": 7,
    "filename": "add-a-service-item.pdf",
    "size": "54 KB"
  },
  {
    "id": "os-002",
    "title": "Add a Group Booking",
    "description": "Book a group tee time with player details, pricing, payment card, and reservation verification.",
    "steps": 11,
    "filename": "add-a-group-booking.pdf",
    "size": "55 KB"
  },
  {
    "id": "os-003",
    "title": "Check In Group Reservations and Apply Payment",
    "description": "Check in a group booking from the tee sheet, charge to an event account, and verify check-ins.",
    "steps": 4,
    "filename": "check-in-group-reservations-and-apply-payment.pdf",
    "size": "52 KB"
  },
  {
    "id": "os-004",
    "title": "Create Combo Items",
    "description": "Build combo/bundled items in Inventory Center — add components, set pricing, and verify at the register.",
    "steps": 7,
    "filename": "create-combo-items.pdf",
    "size": "55 KB"
  },
  {
    "id": "os-005",
    "title": "Day-End Closing Procedures",
    "description": "Close out the register — cash count, denominations, check totals, receipts, and variance review.",
    "steps": 10,
    "filename": "day-end-closing-procedures.pdf",
    "size": "55 KB"
  },
  {
    "id": "os-006",
    "title": "Issue a Rain Check (Single Customer)",
    "description": "Issue a rain check voucher for one customer — select holes played, process refund, and print receipt.",
    "steps": 7,
    "filename": "issue-a-rain-check-single-customer.pdf",
    "size": "53 KB"
  },
  {
    "id": "os-007",
    "title": "Issue Rain Checks for Multiple Players",
    "description": "Issue rain checks for all players on a single tee time where one person paid for the group.",
    "steps": 10,
    "filename": "issue-rain-checks-for-multiple-players-one-tee-time.pdf",
    "size": "53 KB"
  },
  {
    "id": "os-008",
    "title": "Issue Rain Checks for Package Groups (HQ)",
    "description": "Issue rain checks for prepaid package group bookings at the HQ level, one player at a time.",
    "steps": 11,
    "filename": "issue-rain-checks-for-package-groups-hq.pdf",
    "size": "57 KB"
  },
  {
    "id": "os-009",
    "title": "Member Setup Quick Reference",
    "description": "End-to-end trail card membership setup — customer profile, membership class, payment, and finalization.",
    "steps": 11,
    "filename": "mem-001-quick-ref.pdf",
    "size": "55 KB"
  },
  {
    "id": "os-010",
    "title": "Process a Gift Card Sale",
    "description": "Sell and activate a gift card from the register — link to customer, enter card number, and process payment.",
    "steps": 7,
    "filename": "process-a-gift-card-sale.pdf",
    "size": "53 KB"
  },
  {
    "id": "os-011",
    "title": "Process a USGA Youth on Course Discount",
    "description": "Apply a Youth on Course discounted round using split payment between the YOC account and customer.",
    "steps": 7,
    "filename": "process-a-usga-youth-on-course-discount.pdf",
    "size": "51 KB"
  },
  {
    "id": "os-012",
    "title": "Redeem a Gift Card or Credit Voucher",
    "description": "Apply a gift card or credit voucher as payment — search, review balance, apply, and provide receipt.",
    "steps": 9,
    "filename": "redeem-a-gift-card-or-credit-voucher.pdf",
    "size": "51 KB"
  },
  {
    "id": "os-013",
    "title": "Redeem a Raincheck Voucher",
    "description": "Redeem a previously issued rain check during check-in, including handling split payments if needed.",
    "steps": 10,
    "filename": "redeem-a-raincheck-voucher.pdf",
    "size": "53 KB"
  },
  {
    "id": "os-014",
    "title": "Ring Through Prepaid Package Rounds",
    "description": "Check in a prepaid package group and charge rounds to the facility corporate reservations account.",
    "steps": 8,
    "filename": "ring-through-prepaid-package-rounds.pdf",
    "size": "52 KB"
  },
  {
    "id": "os-015",
    "title": "Search and Verify Gift Card Balances",
    "description": "Four methods to look up and verify gift card balances — Tools menu, customer search, checkout, and Vouchers module.",
    "steps": 7,
    "filename": "search-and-verify-gift-card-balances.pdf",
    "size": "53 KB"
  },
  {
    "id": "os-016",
    "title": "Sell a Discounted Gift Card",
    "description": "Sell a gift card at a promotional price while retaining its full face value for the customer.",
    "steps": 8,
    "filename": "sell-a-discounted-gift-card.pdf",
    "size": "56 KB"
  },
  {
    "id": "os-017",
    "title": "Sell a Monthly Membership Pass",
    "description": "Set up and sell a monthly membership pass — customer profile, membership class, and first dues payment.",
    "steps": 6,
    "filename": "sell-a-monthly-membership-pass.pdf",
    "size": "57 KB"
  },
  {
    "id": "os-018",
    "title": "Sell a Prepaid Pass (Prepaid Package)",
    "description": "Sell a prepaid annual pass paid in full — configure membership profile and collect the full prepaid amount.",
    "steps": 6,
    "filename": "sell-a-prepaid-pass-prepaid-package.pdf",
    "size": "56 KB"
  },
  {
    "id": "os-019",
    "title": "Sell an RTJ Trail Card Membership",
    "description": "Sell a new trail card membership — sign up, activate rate, process payment, and complete the transaction.",
    "steps": 11,
    "filename": "sell-an-rtj-trail-card-membership.pdf",
    "size": "55 KB"
  }
];

const articles = [

  {
    id: 'reg-001',
    title: "Add a Service Item",
    module: 'register',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ["service item","menu item","add item","register","pricing","product","inventory center","non-stock","greens fee","cart fee","loyalty","tax group"],
    relatedIds: ["reg-002","reg-007"],
    media: [],
    content: "## Overview\nService (non-stock) items are products that don't require inventory tracking — things like greens fees, cart fees, lessons, or range balls. This procedure walks through adding a new service item in the Club Caddie POS Inventory Center.\n\n## When to Use\n- You need to add a brand-new service that doesn't exist in the system yet (e.g., a new greens fee tier, cart rental, or lesson package).\n- A seasonal or special service item needs to be made available at the register.\n\n## Step-by-Step\n\n**Step 1: Open Settings Menu**\nFrom the main POS screen, click the **gear icon** in the top-right corner to open the Settings menu.\n\n![Click the gear icon in the top-right corner to open Settings](screenshots/reg-001-step01.png)\n\n**Step 2: Select Inventory Center**\nIn the left sidebar, click **Inventory Center** to access the item management area.\n\n![Click Inventory Center in the left sidebar](screenshots/reg-001-step02.png)\n\n**Step 3: Initiate Adding a New Item**\nClick the **ADD ITEM** button in the top-right area to begin creating a new service item.\n\n![Click ADD ITEM to start creating a new item](screenshots/reg-001-step03.png)\n\n**Step 4: Select Inventory Location**\nIn the Details tab, set where this item lives in your inventory structure:\n- Click the **Department** dropdown and select the appropriate department.\n- Click the **Sub-Department** dropdown and select the correct sub-department.\n- Click the **Category** dropdown and select the appropriate category.\n\n> **Note:** The Sub-Department is where the **GL code** (General Ledger code) lives. Make sure the item is placed in the correct Sub-Department so it routes correctly in reporting and operations.\n\n![](screenshots/reg-001-paste2.png)\n\n**Step 5: Set Item Type to Service**\nUnder the **Type** dropdown, select **Serv** (Service) to designate this as a non-stock item. A Service item does not track inventory quantities. If the item is a greens fee or cart fee, also select the appropriate **SubType** — this integrates the item with rack rate and class rate management modules.\n\n> **Note:** SubType is only required for greens fees or cart fees. For food & beverage or other service types, leave SubType blank or at the default.\n\n![](screenshots/reg-001-paste1.png)\n\n**Step 6: Enter Item Name and Pricing**\nComplete the required fields:\n- **Item** – Enter the item name (e.g., \"Employee Cart\").\n- **Item Cost** – Enter the cost value (typically 0 for service items).\n- **Sale Price** – Enter the selling price.\n- **Floor Price** – Enter the minimum allowed price (typically 0).\n\n![](screenshots/reg-001-paste3.png)\n\n**Step 7: Configure Loyalty Settings (Optional)**\nIf this item should earn loyalty points, configure:\n- **Loyalty Earned** – Enter the points value.\n- **Loyalty Earned Type** – Select the earning method: **Points Per Dollar** (earns 1 point per $1 spent, default) or **Fixed** (earns a specific point value regardless of price).\n\n![](screenshots/reg-001-paste4.png)\n\n**Step 8: Select Tax Group**\nClick the **Tax Group** dropdown and select the appropriate tax setting — either **Sales Tax** (standard) or **No Sales Tax** (tax-exempt). While not technically required, selecting a Tax Group is strongly recommended to ensure taxes apply correctly when this item is sold.\n\n![](screenshots/reg-001-paste5.png)\n\n**Step 9: Save the Service Item**\nReview all entered information for accuracy, then click **Save**. The item will now be available in the inventory system and can be added to transactions from the Register.\n\n![Click Save to add the service item to the system](screenshots/reg-001-step15.png)",
  },

  {
    id: 'reg-002',
    title: "Create Combo Items",
    module: 'register',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ["combo","bundle","package","combo item","greens fee cart","round package","assembly items","inventory center","dozen golf balls"],
    relatedIds: ["reg-001"],
    media: [],
    content: "## Overview\nCombo items let you bundle multiple products together and sell them as a single unit at a custom price. This is useful for creating packages like a dozen golf balls (4 sleeves), meal deals, or any bundled merchandise. The combo appears as one button in the register, but each component is tracked separately in reports.\n\n## When to Use\n- You want staff to ring up bundled offerings with a single button press.\n- You're creating product packages (e.g., a dozen golf balls from 4 individual sleeves, a Golf & Cart bundle).\n\n## Step-by-Step\n\n**Step 1: Access Inventory Center**\nFrom the main POS screen, click the **gear icon** in the top-right corner to open the Settings menu. In the left sidebar, click **Inventory Center**. Then click **Add / Manage Items** and select **ADD ITEM** to begin creating a new item.\n\n![](screenshots/reg-002-paste1.png)\n\n**Step 2: Select Inventory Location**\nChoose where the combo button will appear in your inventory structure:\n- Click the **Department** dropdown and select the appropriate department (e.g., Merchandise).\n- Click the **Sub-Department** dropdown and select the correct sub-department (e.g., Golf Balls).\n- Click the **Category** dropdown and select the category (e.g., Callaway).\n\n![](screenshots/reg-002-paste2.png)\n\n**Step 3: Set Type to Combo and Name the Item**\nClick the **Type** dropdown and select **Combo**. Enter a descriptive name in the **Item** field (e.g., \"Dozen Chrome Soft\"). Click **Save** to create the combo item.\n\n> **Note:** The Item Cost, Sales Price, and Floor Price fields will appear grayed out at this stage. This is normal — the combo pricing is calculated from the individual items you add in the next steps.\n\n![](screenshots/reg-002-paste3.png)\n\n**Step 4: Open Setup Combo and Add Items**\nAfter saving, click the **Setup Combo** tab at the top. In the Item Search field, type to find items (e.g., \"Chrome Soft\"), select the item from the dropdown, and click **Add Item**. Repeat to add each unit — for example, add the sleeve item 4 times for a dozen.\n\n> **Note:** Each click of Add Item adds one unit. For a dozen golf balls made up of 4 sleeves, you'd add the sleeve item 4 separate times.\n\n![](screenshots/reg-002-paste4.png)\n![Click Edit next to each item line to set the combo price](screenshots/reg-002-step25.png)\n\n**Step 5: Edit Pricing for Each Item**\nIn the Assembly Items list, click **Edit** next to each item line. Enter the desired price for that item within the combo (e.g., 12.99) and click **Save**. Repeat for each item line. The total combo price is calculated by adding up all individual item prices.\n\n\n![Click Details to review the auto-calculated pricing](screenshots/reg-002-step39.png)\n**Step 6: Review Combo Details and Save**\nClick the **Details** tab to review the pre-populated values. Verify the Item Cost, Sales Price, and Floor Price are correct — these are automatically calculated from the items added. Click **Save**, then click **Close**.\n\n> **Note:** Loyalty redemption points and loyalty earned settings are also calculated based on the individual item configurations.\n\n![Review the Item Cost, Sales Price, and Floor Price — then click Save](screenshots/reg-002-step40.png)\n\n**Step 7: Verify Combo in Register**\nNavigate to the **Register** from the main menu. Browse to the category where you placed the combo item. Verify the combo button appears with the correct name and price, and test that clicking it adds the combo to the cart correctly.\n\n![Verify the combo item appears in the Register with the correct name and price](screenshots/reg-002-step46.png)",
  },

  {
    id: 'reg-004',
    title: "Process a Gift Card Sale",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ["gift card","sell gift card","gift certificate","load gift card","activate","credit voucher","voucher","tools menu"],
    relatedIds: ["reg-006"],
    media: [],
    content: "## Overview\nThis procedure covers selling gift cards from the POS register, including adding a customer (optional), entering the gift card amount, scanning or typing the card number, and completing payment. It also covers how to check a gift card balance and redeem gift cards during checkout.\n\n> **Note:** In Club Caddie, gift cards are called **\"Credit Vouchers\"** in the system. The terms \"gift card\" and \"credit voucher\" refer to the same thing throughout these procedures.\n\n## Sell a Gift Card\n\n**Step 1: Open the Tools Menu and Select Gift Card**\nFrom the Register screen, click **TOOLS** in the menu bar to open the Tools panel. Then click **Gift Card** under the Gift Vouchers section to open the Generate Credit Voucher form.\n\n![](screenshots/reg-004-paste1.png)\n\n**Step 2: Add a Customer (Optional)**\nTo link the gift card to a specific customer profile, click the **magnifying glass** icon next to Add Customer. Search for and select the customer, then click **Done**. This step is optional — you can skip it if the gift card is not being linked to a customer.\n![](screenshots/reg-004-paste2.png)\n> **Note:** Linking a gift card to a customer allows them to look up their balance by name in the future.\n\n**Step 3: Enter the Gift Card Amount**\nIn the **Voucher Amount** field, enter the dollar value to load onto the gift card. The system will display the purchase date automatically. If your location uses expiration dates, you can review or set an expiration date in the fields below.\n\n**Step 4: Enter or Scan the Gift Card Number**\nChange the **Voucher No** dropdown from **\"Auto\"** to **\"Specified\"**. This enables the card number entry field. Either scan the physical gift card with a barcode scanner, or manually type the gift card number into the field.\n![](screenshots/reg-004-paste3.png)\n> **Note:** **Auto** generates a random voucher code (use for digital/virtual gift cards). **Specified** lets you enter the number printed on the physical card (use when the customer has a physical gift card to scan or swipe).\n\n**Step 5: Add the Gift Card to the Sale**\nClick the **ADD** button to add the gift card to the transaction. The gift card will appear in the order summary on the right side of the screen showing the voucher amount as the Grand Total.\n\n![Click ADD to add the gift card to the transaction](screenshots/reg-004-step13.png)\n\n**Step 6: Complete the Payment**\nClick **Pay** to proceed to payment. Select the customer's payment method (Cash, Check, Credit Card, etc.) from the Payment Mode options. For cash payments, enter the amount received or click **Pay Exact Amount**. Ensure **Print Customer Receipt** is checked.\n\n![](screenshots/reg-004-paste4.png)\n\n**Step 7: Print and Provide Receipts to Customer**\nClick **OK** or **Close** to complete the transaction. The system prints a credit customer receipt plus a voucher receipt containing the gift card number. Give both receipts to the customer — they can attach the voucher receipt to the physical gift card for reference.\n\n> **Note:** The voucher receipt contains the gift card number needed for redemption. Always provide this to the customer.\n\n## Check a Gift Card Balance (Without a Sale)\n\nTo check a gift card balance without processing a sale, go to **TOOLS** and click **Check Voucher Balance**. Search by customer name or gift card number to view the current balance.\n\n## Redeem a Gift Card During Checkout\n\nDuring a regular checkout transaction, when the customer is ready to pay, select **Gift Card/Credit Voucher** as the payment method. Search for the gift card by number or customer name, select it, and click **Done**. Confirm the balance with **OK** to apply the gift card to the transaction.\n\n> **Note:** If the gift card balance is less than the total, the remaining amount will need to be paid with another payment method.",
  },

  {
    id: 'reg-006',
    title: "Search and Verify Gift Card Balances",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ["gift card balance","check balance","gift card lookup","verify gift card","check voucher balance","voucher","usage","vouchers module"],
    relatedIds: ["reg-004"],
    media: [],
    content: "## Overview\nThere are several ways to search and verify a gift card balance in Club Caddie — from the Tools menu, during checkout, or through the Vouchers module. This article covers all the methods available.\n\n## Method 1: Check Voucher Balance (Tools Menu)\n\n**Step 1: Open Check Voucher Balance**\nGo to **Tools**, then click **Check Voucher Balance**.\n\n![](screenshots/reg-006-paste1.png)\n\n**Step 2: Search by Gift Card Number or Customer Last Name**\nIn the Check Voucher Balance screen, either type the gift card number and click **Search**, or search by the customer's last name.\n\n> **Note:** Searching by last name can pull up rain checks or gift cards tied to that customer.\n\n![](screenshots/reg-006-paste2.png)\n\n**Step 3: View the Balance**\nReview the returned gift card and its current balance. Click **Clear Search** to remove the previous search before searching again.\n\n![Review the gift card balance in the results](screenshots/reg-006-step03.png)\n\n## Method 2: Search Customer Name / Voucher No.\n\n**Step 1: Use the Search Customer Name, Voucher No. Option**\nClick **Search Customer Name, Voucher No.** Enter the customer's last name, then locate and select the correct search result. This is another way to pull up customer-tied rain checks or gift cards to verify the balance.\n\n![Enter the customer's last name and select the correct result](screenshots/reg-006-step08.png)\n\n## Method 3: Check Balance During Checkout\n\n**Step 1: Search a Gift Card Balance While Paying for an Item**\nStart a sale by selecting a merchandise area and an item. Click **Pay**, then click **OK**. When prompted with **Gift card credit voucher**, click **OK**.\n![](screenshots/reg-006-paste3.png)\n**Step 2: Search for the Gift Card from the Checkout Prompt**\nClick into the gift card search area, then use **Search Customer Name, Voucher No.** Enter the gift card number, click **Search**, and review the balance.\n\n![Search for the gift card number from the checkout prompt](screenshots/reg-006-step17.png)\n\n![Review the balance from the search results](screenshots/reg-006-step19.png)\n\n## Method 4: Vouchers Module (Detailed Usage)\n\n**Step 1: Use the Vouchers Module**\nClick **Vouchers**, then click **Gift Card**. Search by voucher number as needed. Click **Usage** to view detailed gift card activity and transaction history.\n\n> **Note:** The Vouchers module shows all details and usage for gift cards, including when actions occurred. You can drill down to a receipt-level view.\n\n![](screenshots/reg-006-paste4.png)\n",
  },

  {
    id: 'reg-007',
    title: "Issue a Rain Check (Single Customer)",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.4',
    keywords: ["rain check","raincheck","refund","weather","credit","issue rain check","voucher","single player"],
    relatedIds: ["reg-008"],
    media: [],
    content: "## Overview\nUse this procedure to issue a rain check voucher for one player from their tee sheet check-in. You'll select holes played to calculate the refund amount, complete the voucher/refund flow, print the voucher receipt, and locate the issued rain check record.\n\n## When to Use\n- A customer's round is cut short due to rain or inclement weather.\n- A manager has authorized a rain check for a single player.\n\n## Step-by-Step\n\n**Step 1: Locate the Player and Issue Rain Check**\nFind the player on the tee sheet/check-in list. Right-click the player's name to open the context menu, then click **Issue Rain Check**.\n![](screenshots/reg-007-paste1.png)\n**Step 2: Set the Holes Played**\nThe rain check interface opens. Select the tee time and specify how many holes have been completed (e.g., select 9 holes) so the refund amount updates accordingly.\n\n![](screenshots/reg-007-paste2.png)\n\n**Step 3: Start the Refund**\nClick the **Refund** option to begin processing the rain check. Confirm the refund selection by clicking the confirmation button.\n![](screenshots/reg-007-paste3.png)\n\n**Step 4: Choose the Rain Check Voucher Option**\nSelect **Rain Check Voucher**. You may leave the Voucher field blank — the system will auto-populate an item/receipt. Click **OK**.\n\n![](screenshots/reg-007-paste4.png)\n**Step 5: Select the POS Terminal**\nClick the POS terminal associated with the player's transaction to continue.\n\n**Step 6: Print and Save**\nContinue through the prompts to prepare the voucher receipt. Print the rain check receipt/voucher for the player. Click **Save** to record the transaction. Confirm the receipt printed successfully by clicking **Yes**.\n\n**Step 7: Review the Rain Check Record**\nClick the **Rain Check** section to view issued rain checks. Click the correct entry to open the record details. You can also open the rain check PDF from File Explorer to view or print the voucher details.\n\n> **Note:** Rain checks issued here are tied to the customer's account and can be looked up at the register when they return to redeem.\n\n",
  },

  {
    id: 'reg-008',
    title: "Issue Rain Checks for Multiple Players (One Tee Time)",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.2',
    keywords: ["rain check","multiple players","group rain check","bulk rain check","weather","voucher","group refund"],
    relatedIds: ["reg-007"],
    media: [],
    content: "## Overview\nThis covers issuing a single rain check transaction for multiple players on the same tee time — for example, when one payer covered 4 players and the group gets rained out. The system pulls in all players, calculates the refund, and issues vouchers for each.\n\n## Step-by-Step\n\n**Step 1: Open the Tee Time for the Payer**\nLocate the tee time where one person paid for all players. Select their tee time to open the options menu.\n\n![](screenshots/reg-008-paste1.png)\n\n**Step 2: Start the Rain Check Process**\nClick **Issue Raincheck**. The system automatically pulls in all players on that tee time.\n\n**Step 3: Confirm All Players Were Pulled In**\nVerify the system shows all players for the tee time (e.g., all 4 players). This happens automatically when you select Issue Raincheck from the group's tee time.\n![](screenshots/reg-008-paste2.png)\n\n**Step 4: Update Holes Played for Each Player**\nChange the holes played selections to match the group's actual progress. Use the dropdown(s) to select the appropriate number of holes played for each player.\n\n![](screenshots/reg-008-paste3.png)\n\n**Step 5: Process the Refund**\nReview the updated refund amount shown for the group. Click **Refund**.\n\n**Step 6: Select the Rain Check Voucher Option**\nClick **Rain Check Voucher**, then click **OK**. The system will print a receipt after you confirm.\n\n![](screenshots/reg-008-paste4.png)\n\n**Step 7: Save and Collect Printed Receipts**\nClick **Save** to record the rain check. Two receipts will print: a customer copy and a voucher receipt showing the total voucher selected. Provide the printed receipts as needed.\n\n**Step 8: Review the Issued Rain Check Vouchers**\nClick **Rain Check** to open the rain check management application. Open the rain check details to review the voucher information — including the rain check number and the voucher details for all players in the group.\n\n> **Note:** Selecting Issue Raincheck from the tee time (not an individual name) is what triggers the bulk flow and pulls all players automatically.\n",
  },

  {
    id: 'reg-010',
    title: "Day-End Closing Procedures",
    module: 'register',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '2.1',
    keywords: ["close","closing","end of day","day end","shift close","cash drawer","Z report","reconcile","deposit","variance","denomination"],
    relatedIds: ["reg-011"],
    media: [],
    content: "## Overview\nThe day-end closing procedure reconciles all register transactions and prepares the system for the next business day. This is run at the end of each operating day after the last transaction is processed, by a manager or designated senior staff member.\n\n## Step-by-Step\n\n**Step 1: Open Day End Closing from Tools**\nClick **Tools**, then click **Day End Closing**.\n\n![Select the closing date and the user responsible for the close](screenshots/reg-010-step04.png)\n\n**Step 2: Select the Correct Closing Date and User**\nSelect the correct date, then select the user responsible for closing the drawer/terminal.\n\n**Step 3: Select the POS Terminal**\nSelect the point of sale terminal you are closing.\n\n![](screenshots/reg-010-paste1.png)\n\n**Step 4: Count Drawer Cash and Enter the Total**\nCount all cash in the drawer. Your total should include **everything in the drawer** — the starting balance you began the day with plus all cash received from transactions. Enter this combined total.\n\n![](screenshots/reg-010-paste3.png)\n**Step 5: Enter Cash Denominations**\nEnter each cash denomination amount. Click the denomination buttons to add each to the total. Continue through the cash entry prompts until the full drawer count is entered.\n\n![](screenshots/reg-010-paste2.png)\n\n**Step 6: Save the Cash Count**\nConfirm the final counted total in the drawer. Click **Save** to record the total cash amount.\n\n![](screenshots/reg-010-paste4.png)\n\n**Step 7: Enter Check Totals (If Applicable)**\nIf you collected checks, enter the total check amount. Click **Add Check** to enter multiple checks if needed. Skip this step if no checks were collected.\n\n**Step 8: Close the Day for the Terminal**\nClick **Close Day** to finalize the terminal closing process. When prompted, confirm by selecting **Yes**. The system will print a receipt after you confirm.\n\n![Confirm by selecting Yes — the system will print a receipt](screenshots/reg-010-step26.png)\n\n**Step 9: Review the Day End Receipt PDF**\nOpen the Day End Receipt PDF. Review the total summary report, including overall sales and gross sales at the bottom, and the reported total cash collected.\n\n**Step 10: Review Expected vs. Actual Cash and Resolve Variances**\nReview the report showing expected drop amount, actual counted amount, any variance, and payment breakdowns. If there is a large variance, recount your cash and bank. Once confirmed, deposit the cash into the safe.\n\n> **Note:** Small variances (e.g., being short $2–3) are generally considered acceptable. The Z-report resets daily totals — once closed, the register is ready for the next day's opening count.\n\n![](screenshots/reg-010-paste5.png)",
  },

  {
    id: 'reg-011',
    title: "Issue Rain Checks for Package Groups (HQ)",
    module: 'register',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ["rain check","package group","HQ","prepaid","group booking","weather refund","raincheck voucher","credit voucher"],
    relatedIds: ["reg-007","reg-008","tee-003"],
    media: [],
    content: "## Overview\nRain checks allow customers who paid for a round but couldn't complete it (due to weather, course conditions, etc.) to receive a voucher for the remaining value of their tee time. The voucher can be redeemed for future golf course credit.\n\n> **IMPORTANT:** Unlike reg-008 (which handles multiple players on one tee time paid by one person), this procedure is for **HQ/package group bookings** where each player must be processed individually. There is no bulk processing option for package groups — for a group of 8 players, you will need to complete this entire process 8 separate times.\n\n## Step-by-Step\n\n**Step 1: Locate the Booking on the Tee Sheet**\nNavigate to the **Tee Sheet** and find the booking that requires a rain check. Identify the specific player or group that has paid but needs a rain check due to weather or course conditions.\n\n**Step 2: Select the Booking and Issue Raincheck**\nSelect the player's booking entry to open the context menu. Click **Issue Raincheck** to begin the rain check process.\n\n![Click Issue Raincheck in the Order Details panel](screenshots/reg-011-step02.png)\n\n**Step 3: Confirm Rain Check Issuance**\nThe **Order Details** panel appears showing the booking information. Click the **Issue Raincheck** button to proceed with the refund process.\n\n![Click Issue Raincheck in the Order Details panel](screenshots/reg-011-step02.png)\n\n**Step 4: Select the Player for Rain Check**\nThe system displays all players in the booking with their tee time details and costs. Click the **checkbox** next to the specific player's booking entry. You can only process one player at a time.\n\n> **Note:** The system does not support selecting multiple players simultaneously.\n\n![](screenshots/reg-011-paste1.png)\n\n**Step 5: Select Number of Holes Played**\nClick the **Holes Played** dropdown and select the number of holes the player completed before leaving (0–18). The system automatically calculates the refund amount based on the remaining holes.\n\n> **Note:** Selecting 0 holes provides a full refund. The refund amount decreases proportionally as more holes are played.\n\n![Select how many holes the player completed — the refund amount calculates automatically](screenshots/reg-011-step05.png)\n\n**Step 6: Review Refund Amount and Click Refund**\nReview the calculated refund details including **Refund Amount**, **Refund Tax**, and **Total Refund Amount**. Once verified, click **Refund** to proceed.\n\n![](screenshots/reg-011-paste2.png)\n\n**Step 7: Select Raincheck Voucher as Payment Mode**\nIn the **Payment Mode** dialog, select **Raincheck Voucher** as the refund method. This creates a voucher that the customer can redeem for future golf course credit.\n\n> **Note:** Other options like Cash, Check, or Refund Voucher may be available, but Raincheck Voucher is the standard method for weather-related cancellations.\n\n![Select Raincheck Voucher as the payment mode](screenshots/reg-011-step07.png)\n\n**Step 8: Confirm and Print the Rain Check Receipt**\nClick **OK** to confirm the rain check voucher creation. The system will process the refund and generate the voucher code. Once complete, click **OK** to print the rain check receipt.\n\n**Step 9: Review the Rain Check Voucher Receipt**\nThe printed receipt shows the **Credit Voucher Receipt** with all details: recipient name, voucher type (Raincheck), voucher amount, voucher balance, and the unique voucher code (e.g., A61). This code is required for redemption.\n\n> **Note:** Keep a copy of the receipt for your records. The customer will need the voucher code to redeem their credit on a future visit.\n![](screenshots/reg-011-paste3.png)\n**Step 10: Repeat Process for Additional Players**\nReturn to the **Tee Sheet** and select the next player's entry to issue their rain check. When you open the Order Details, previously processed players will show as **Returned** status and cannot be selected again. Select the next eligible player and repeat Steps 5–9.\n\n![Select the next player and repeat the rain check process](screenshots/reg-011-step21.png)",
  },

  {
    id: 'reg-012',
    title: "Sell a Discounted Gift Card",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.1',
    keywords: ["discount gift card","promotional gift card","gift card sale","gift card discount","voucher","credit voucher"],
    relatedIds: ["reg-004","reg-006"],
    media: [],
    content: "## Overview\nThis procedure covers selling a discounted gift card through the register — for example, a customer pays $80 for a $100 gift card. The discount is applied at the register, but the card is loaded with the full face value.\n\n## Important Rules\n> **CRITICAL:** When selling a discounted gift card, the gift card **MUST** be the only item in that transaction. Do not include any other products (shirts, golf balls, etc.) in the same transaction — the discount will incorrectly apply to those items as well.\n\n## Step-by-Step\n\n**Step 1: Access the Gift Card Function**\nNavigate to **Tools → Register → Gift Card**.\n\n**Step 2: Add Customer Information (Optional)**\nAt the top of the screen, you'll see a field to tag a customer name. If selling to a specific customer, search for and select their profile. This step is optional but recommended for tracking.\n![](screenshots/reg-012-paste1.png)\n**Step 3: Enter Gift Card Details**\nEnter the **Voucher Amount** (e.g., $100 for a hundred-dollar gift card). The **Expiration Date** will auto-populate. Input the gift card number by typing it manually, scanning the barcode, or swiping the magnetic strip (click the **KB (Keyboard Entry) button**, then slide the card on the track).\n\n![Gift card entry form — fill in voucher amount, expiration populates automatically, then enter the card number](screenshots/reg-012-01-credit-voucher-form.png)\n\n**Step 4: Add Gift Card to Register**\nClick **Add** to pull the gift card into the register. The gift card will now appear in the transaction.\n\n**Step 5: Apply the Discount**\nLocate the pre-populated discount options below the transaction. Click the dropdown menu, select **Gift Card Discount**, and click **Apply**. The applicable discount will be applied to the gift card.\n\n![](screenshots/reg-012-paste4.png)\n**Step 6: Verify Transaction Details**\nReview the discount total displayed on screen. Confirm the transaction total reflects the discounted amount (e.g., $80 for a $100 gift card with 20% discount). **Ensure no other items are included in this transaction.**\n\n**Step 7: Process Payment**\nClick **Pay**, select the payment method, and enter the payment amount. This should match the **discounted price**, not the gift card value. Complete the transaction.\n![](screenshots/reg-012-paste5.png)\n**Step 8: Verify Gift Card Balance**\nAfter completing the transaction, locate the gift card in the system. Verify the gift card shows the **full voucher amount** (e.g., $100), not the discounted sale price. The customer paid the discounted amount but receives the full gift card value.\n![](screenshots/reg-012-paste6.png)\n## Common Mistakes to Avoid\n- Including other products in the transaction — the gift card discount will apply to all items.\n- Forgetting to apply the discount — always select and apply before processing payment.\n- Using an already-activated gift card number — ensure you're using a new, unused card number.\n\n## Troubleshooting\n- If you accidentally add other items, remove them before applying the discount.\n- If you forget to apply the discount, void the transaction and start over.\n- If a gift card number has already been used, select a different gift card.",
  },

  {
    id: 'reg-013',
    title: "Process a USGA Youth on Course Discount",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.1',
    keywords: ["USGA","youth on course","YOC","junior golf","discount","youth discount","split payment","membership ID"],
    relatedIds: ["reg-001"],
    media: [],
    content: "## Overview\nYouth on Course (YOC) is a USGA program offering juniors discounted rounds at participating courses. YOC rounds require a **split payment** — $5 goes to the facility's YOC membership account, and the remainder is charged to the customer's payment method. This is different from a standard round checkout.\n\n## Prerequisites\n- Staff must have access to the register system and tee sheet.\n- The facility must have a USGA YOC membership ID set up in the system.\n- Verify the tee time is properly designated as \"USGA YOC 18 Walk\" in the booking system.\n\n## Step-by-Step\n\n**Step 1: Identify the Youth on Course Tee Time**\nLocate the tee time on the tee sheet. Verify it shows the **\"USGA YOC 18 Walk\"** designation. Note the player name.\n\n![](screenshots/reg-013-paste2.png)\n\n**Step 2: Pull the Tee Time to Register**\nSelect the tee time from the tee sheet and pull it through to the register system.\n![](screenshots/reg-013-paste3.png)\n**Step 3: Initiate Split Payment**\nClick on **Split Pay** in the register. YOC rounds require $5 to go to the membership account, with the remainder charged to the customer.\n\n**Step 4: Process the $5 Membership Payment**\nSelect **Membership ID** as the first payment method. Enter **$5** as the amount. Click **Search**, then select your facility's USGA YOC membership ID from the list. Select the applicable facility, click **Done**, then click the **\"+\"** button to apply that payment.\n\n![](screenshots/reg-013-paste4.png)\n\n**Step 5: Verify Remaining Balance**\nCheck the bottom of the screen to confirm the total paid ($5.00) and the remaining balance the customer owes.\n![](screenshots/reg-013-paste5.png)\n**Step 6: Process Remaining Payment**\nSelect the customer's preferred payment method (cash, card, etc.). Enter the remaining amount. Click **Pay and Finalize**.\n![](screenshots/reg-013-paste6.png)\n**Step 7: Complete Transaction**\nThe system processes the transaction and the receipt prints automatically. The $5 is charged to the YOC membership account, and the remainder is charged to the customer's payment method.\n\n## Tips & Tricks\n- Always verify the YOC designation on the tee time before processing — regular rounds should not use this workflow.\n- The $5 membership charge is fixed — this amount never changes regardless of the total round cost.\n- Process the membership payment **first** — always apply the $5 before collecting the customer's payment.\n- Watch for the \"+\" button — it must be clicked to apply the membership payment before proceeding.\n\n## Troubleshooting\n- **Can't find the USGA YOC membership ID:** Contact your manager or system administrator to verify it's set up for your facility.\n- **Split Pay is grayed out:** Verify the tee time was properly pulled to the register and you have the correct permissions.\n- **Wrong amount applied to membership:** If not finalized, remove the payment and re-enter $5. If the transaction is complete, process a refund and re-ring it.\n- **Customer payment declined after membership payment applied:** The $5 is already applied — request an alternative payment method. Do not finalize until you've confirmed payment for the remaining balance.\n- **Tee time doesn't show \"USGA YOC\" designation:** Verify with the customer that they are a YOC participant. Contact booking to correct the designation. Do not process as YOC if the designation is not present.",
  },

  {
    id: 'reg-014',
    title: "Sell a Prepaid Pass (Prepaid Package)",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.1',
    keywords: ["prepaid pass","prepaid package","golf pass","punch card","multi-round","season pass","annual pass","paid in full","class assignment"],
    relatedIds: ["reg-015","mem-001"],
    media: [],
    content: "## Overview\nThis SOP covers selling prepaid annual passes to both new and existing customers. The process involves setting up the customer profile, configuring their membership class, and processing the full prepaid amount through the register.\n\n## Prerequisites\nBefore starting, make sure you have all of the following customer information ready: First Name, Last Name, Email Address, Phone Number, Full Street Address, City, State, and ZIP Code. All fields are **required** to sign up a new member — gather this before you begin.\n\n## Step-by-Step\n\n**Step 1: Access Customer Profile**\nNavigate to the **Customers** tab. For new customers, click **Create Profile**. For existing customers, use the search function to locate their account. Double-click the customer name to open their profile.\n![](screenshots/reg-014-paste1.png)\n**Step 2: Set Up Member Information**\nFor **new customers**: Check the \"Signup\" checkbox at the bottom of the profile — this navigates you to the Member Info tab. For **renewing customers**: Go directly to the Member Info tab (skip the signup checkbox).\n![](screenshots/reg-014-paste2.png)\n**Step 3: Configure Membership Details**\nNote the auto-generated member number (no action needed). Select the appropriate class from the dropdown (e.g., \"Annual Pass Couple Paid in Full\"). Set the **Effective Date** to today. The **Expiration Date** will auto-populate to one year out.\n![](screenshots/reg-014-paste4.png)\n> **CRITICAL:** Ensure **\"Pay by Class Assignment by Charge Account\"** is turned ON. Click **OK** to apply the class, then click **Save**.\n![](screenshots/reg-014-paste5.png)\n\n**Step 4: Process Payment**\nExit the customer profile. Navigate to **Register → Tools → Membership Payment**. Click the magnifying glass icon to search for the customer. New customers will appear at the top of the list; existing customers can be found via the search bar. Select the customer and click **Done**.\n\n![](screenshots/reg-014-paste6.png)\n\n**Step 5: Enter the Correct Payment Amount**\n![](screenshots/reg-014-paste7.png)\n> **WARNING:** The system displays a \"Monthly Balance\" on this screen — **do NOT use this number.** It only reflects the first month's revenue recognition and is NOT the amount the customer owes. Charging this amount instead of the full prepaid price is a common and costly mistake.\n\nRefer to the **prepaid pricing list at your counter** for the correct full amount. Enter the **full prepaid amount including tax** (e.g., $4,387.25). Click **OK**.\n\n**Step 6: Complete the Transaction**\nThe full amount will populate in the register. Click **Pay** and select the customer's payment method (cash, check, credit card, etc.). If paying by check, enter the check number and click **OK** to finalize.\n\n## Common Mistakes to Avoid\n- Using the monthly balance amount instead of the full prepaid amount.\n- Forgetting to turn ON \"Pay by Class Assignment by Charge Account.\"\n- Not collecting all required customer information for new members.\n- Confusing the new signup process with the renewal process.\n\n## Key Reminders\n- **Payment Amount:** Always reference your counter's prepaid pricing list — the system's monthly balance is NOT the correct amount to charge.\n- **Dates:** Effective date should always be the day of purchase.\n- **New vs. Renewal:** New members need the signup checkbox; renewals go straight to Member Info.\n- **Revenue Recognition:** The system automatically handles monthly revenue recognition after you deposit the full prepaid amount.",
  },

  {
    id: 'reg-015',
    title: "Sell a Monthly Membership Pass",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.1',
    keywords: ["monthly pass","membership pass","monthly membership","recurring","subscription","monthly golf","dues","sign up","member info"],
    relatedIds: ["reg-014","mem-001"],
    media: [],
    content: "## Overview\nThis SOP covers selling a monthly membership pass to both new and existing customers. Monthly passes charge the customer a recurring fee, and this procedure walks through the full setup from customer profile to first payment.\n\n## Prerequisites\nBefore proceeding, verify the customer account has **all required fields** completed: First Name, Last Name, Email, Mobile Number, Address, City, State, and ZIP Code. Without these fields, you cannot sell a membership through the system.\n\n## Step-by-Step\n\n**Step 1: Access Customer Account**\nNavigate to the **Customers** tab. For new customers, click **Add Customer**. For existing customers, use the search function to find their account. Double-click the customer name (or click the action dots and select \"View/Edit\") to open their profile.\n![](screenshots/reg-015-paste1.png)\n**Step 2: Access Membership Sign-Up**\nFor **new members (first-time sign-up)**: Check the **\"Sign up for Membership\"** checkbox — this automatically navigates to the Member Info tab. For **renewing members**: Click directly on the **Member Info** tab (their existing member number will be retained).\n![](screenshots/reg-015-paste2.png)\n\n\n> **Note:** Required fields to sell a membership are: First, Last, email, mobile, and full address to sell this membership. \n\n**Step 3: Select Membership Class**\nClick **Select Class** and choose the appropriate membership type (e.g., \"Couple Monthly\"). Set the **Effective Date** to today's date (the sale date). The **Expiration Date** will auto-populate to one year from today.\n![](screenshots/reg-015-paste3.png)\n> **CRITICAL:** Ensure the checkbox labeled **\"Pay this class assignment by charge account\"** is checked — this tells the system to calculate and display the customer's first month's payment amount so you can collect it at the register. If you skip this, the system won't know the customer owes anything. Click **OK** to apply the membership, then click **Save**.\n![](screenshots/reg-015-paste4.png)\n\n\n**Step 4: Process Payment via Register**\nNavigate to **Register → Tools → Membership Payment**. Click the magnifying glass icon to search. New members will appear at the top of the list; renewing members can be found via the search bar. Select the customer account and click **Done**.\n\n![Register — Tools — Membership Payment — use the magnifying glass to search, or select the new member at the top]\n![](screenshots/reg-015-paste5.png)\n**Step 5: Enter Payment Amount**\nThe system will display the amount owed for the first month's payment. Enter this amount in the Amount box (e.g., $396.49). Click **OK**. The amount will transfer to the register.\n![](screenshots/reg-015-paste6.png)\n**Step 6: Complete Payment**\nClick **Pay** and select the customer's payment method (Cash, Check, or Credit Card). If paying by check, enter the check number. Click **OK** to process the payment.\n\n## Common Mistakes to Avoid\n- Forgetting to check the \"Post Dues\" checkbox in Step 3 — without it, the system won't calculate the first payment.\n- Not saving the account after adding the membership.\n- Missing required customer information fields before starting.\n- Confusing the new signup process (checkbox) with the renewal process (go straight to Member Info).\n\n## Key Reminders\n- Always verify contact information is complete before starting.\n- Double-check the effective date matches the sale date.\n- Confirm the dues posting checkbox is selected.\n- New members appear at the top of the membership payment list for quick access.\n\n> **Note:** Cancellation procedures for monthly passes require manager approval. Staff cannot cancel without manager authorization.",
  },

  {
    id: 'tee-002',
    title: "Check In Group Reservations and Apply Payment",
    module: 'tee-sheet',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ["group check in","group reservation","group tee time","check in group","quickpay","check-in plus","event charge","view check-ins"],
    relatedIds: ["tee-003"],
    media: [],
    content: "## Overview\nThis procedure covers how to check in a group reservation on the tee sheet, choose the correct check-in method, take payment, optionally add items to the register cart, charge a group to an event account, and verify check-in counts using View Check-Ins.\n\nThere are **three check-in methods** available. Use this quick guide to pick the right one:\n\n- **Check-In** — Use when the golfer needs to buy add-ons (range balls, merchandise, food) before paying. Opens the register cart so you can add items.\n- **QuickPay** — Use for a fast, straightforward check-in with no extras. Skips the register and goes straight to the payment screen.\n- **Check-In Plus** — Use when multiple golfers are paying together on one transaction (e.g., one person paying for a foursome).\n\n## Step-by-Step\n\n**Step 1: Confirm the Correct Date**\nBefore checking in, verify the reservation date matches the day you're checking in.\n![](screenshots/tee-002-paste10.png)\n> **Note:** Checking in early (for example, checking in on January 8th for a January 9th reservation) will record revenue on the wrong date.\n\n**Step 2: Select the Group Reservation**\nRight-click the group reservation on the **Tee Sheet** to view the available check-in options. You'll see three options: Check-In (Price), Check-In QuickPay, and Check-In Plus.\n\n![](screenshots/tee-002-paste11.png)\n\n---\n\n### Option A: Check-In (Register/Cart Workflow)\n\n**Step 3A: Select Check-In Price 1**\nSelect **Check-in Price 1** to check in a single golfer and bring them into the register/cart. This lets you add extras like range balls or merchandise before payment.\n\n![](screenshots/tee-002-paste12.png)\n\n**Step 4A: Add Items and Take Payment**\nAdd any additional items to the cart. Select the payment method (cash, credit card, etc.) and click **Pay Exact Amount** to finalize.\n\n![](screenshots/tee-002-paste13.png)\n\n---\n\n### Option B: QuickPay (Bypass Register)\n\n**Step 3B: Select QuickPay**\nSelect **Check-in QuickPay** (choose the QuickPay price) to bypass the register and go directly to the payment screen. Click **OK** to proceed.\n\n> **Note:** QuickPay is the fastest path — it bypasses the register entirely.\n\n![](screenshots/tee-002-paste15.png)\n\n**Step 4B: Choose Payment Method and Complete**\nChoose the payment method (gift card, credit card, or cash). If paying cash, select **Pay Exact Amount**, then click **OK** to complete the payment.\n\n\n\n---\n\n### Option C: Group Check-In Plus (Multiple Golfers on One Payment)\n\n**Step 3C: Select Check-In Plus**\nCheck all the players you wish to check in. Right-click the reservation and choose **Check-in Plus**. Enter the number of golfers to include on the payment. If some golfers have already paid, enter only the remaining number.\n\n![](screenshots/tee-002-paste7.png)\n\n**Step 4C: Enter Number of Golfers and Check In**\nEnter the number of golfers to include, then click **Check-in**. The group is added to the cart for payment processing.\n\n\n![The group is added to the cart for payment](screenshots/tee-002-step13.png)\n\n---\n\n### Charging to an Event Account\n\n**Step 5: Charge the Group to an Event Account**\nSelect the **Event charge** option. Search for the relevant event, select the correct event date, then click **Done**. Click **OK** to acknowledge the charges have been applied to the event account.\n![](screenshots/tee-002-paste8.png)\n![Select the event date and click Done](screenshots/tee-002-step16.png)\n> **Note:** This charges the group to an account for final payment later — useful for corporate outings or tournaments.\n\n\n\n\n---\n\n### Verifying Check-Ins\n\n**Step 6: View Check-Ins**\nRight-click the tee time and select **View Check-Ins** to see a summary of who was checked in, at what price, and who was charged to the account.\n\n![](screenshots/tee-002-paste9.png)",
  },

  {
    id: 'tee-003',
    title: "Add a Group Booking",
    module: 'tee-sheet',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '1.3',
    keywords: ["group booking","group reservation","outing","corporate outing","tournament booking","auto select","group pricing","payment card"],
    relatedIds: ["tee-002","reg-011"],
    media: [],
    content: "## Overview\nThis procedure covers how to add a group booking on the tee sheet in Club Caddie, including selecting the start time, entering group details, setting group pricing, attaching a customer profile (and optional payment card), and saving the booking.\n\n## Step-by-Step\n\n**Step 1: Start a New Group Booking from the Tee Sheet**\nRight-click the desired start time on the tee sheet and select **Add Group Reservation** to open the Group Reservations form.\n\n![](screenshots/tee-003-paste1.png)\n\n**Step 2: Review Start/End Time Behavior**\nThe start time defaults to the time where you initiated the booking. The end time is grayed out while **Auto Select** is enabled — Auto Select automatically adjusts the end time based on the number of players you enter in the next step.\n\n![](screenshots/tee-003-paste2.png)\n\n**Step 3: Enter the Group Name and Number of Golfers**\nEnter the group name — this will display on the tee sheet, so include as much detail as you'd like. Then enter the total number of golfers for the booking.\n\n![](screenshots/tee-003-paste3.png)\n\n**Step 4: Select Group Price and Adjust if Needed**\nSelect the group price (e.g., \"Outing 18 Ride\"). Review the default price — if needed, update it to the correct rate. You can add up to 4 pricing tiers. For example, a corporate outing might have Tier 1 at $75/golfer for employees and Tier 2 at $95/golfer for guests.\n\n\n![Adjust the price if the default doesn't match your group rate](screenshots/tee-003-step06.png)\n\n**Step 5: Attach a Customer Profile (Optional)**\nClick the **magnifying glass** to open the customer list. Search by last name, click **Search**, select the correct customer, and click **Done**. This links the group booking to a customer profile.\n\n![Click the magnifying glass to search for and attach a customer profile](screenshots/tee-003-step08.png)\n\n![Search by last name, select the customer, and click Done](screenshots/tee-003-step10.png)\n\n**Step 6: Review Customer Profile and Confirm Active Status**\nReview the selected individual's profile information. Ensure the profile shows as **Active**. If needed, click the eyeball icon to view or update their details.\n\n![Review the customer profile — confirm it displays as Active](screenshots/tee-003-step13.png)\n\n**Step 7: Add a Payment Card (Optional)**\nClick the **Payment** tab. Enter the card information and click **Save** to attach the card to the customer profile for the group booking.\n\n![](screenshots/tee-003-paste4.png)\n\n**Step 8: Save and Verify the Group Booking**\nClick **Save** to finalize and record the group booking. Confirm the group outing displays as successfully created on the tee sheet.\n\n> **Note:** Group bookings should be coordinated with the golf operations manager before confirming. Check cart availability and staff coverage for the booking date.\n\n![](screenshots/tee-003-paste5.png)\n\n\\",
  },

  {
    id: 'mem-001',
    title: "Sell an RTJ Trail Card Membership",
    module: 'membership',
    role: 'manager',
    dateUpdated: '2026-02-23',
    version: '2.0',
    keywords: ["trail card","membership","trail fee","annual membership","member setup","membership payment","sign up for membership"],
    relatedIds: ["reg-014","reg-015"],
    media: [],
    content: "## Overview\nThis procedure covers how to sell an RTJ Trail Card membership from the tee sheet/POS by locating the customer profile, signing them up for the Trail Card membership, confirming membership dates and pay class, processing the membership fee through Tools, optionally combining tabs into one order, and completing payment with a customer receipt.\n\n## Step-by-Step\n\n**Step 1: Open the Customer Profile from the Tee Sheet/POS**\nFrom the **Tee Sheet and Point of Sale**, double-click into the customer's profile.\n\n![](screenshots/mem-001-paste1.png)\n\n**Step 2: Search for the Customer (If Needed)**\nClick the **magnifying glass** to search for the customer. Click **View Customer Profile** to open the selected customer's details.\n\n![Click View Customer Profile to open their details](screenshots/mem-001-step02.png)\n\n**Step 3: Start the Membership Signup**\nClick **Sign Up for Membership**, then scroll down and select **RTJ Trail Card**.\n\n![](screenshots/mem-001-paste2.png)\n\n**Step 4: Add the Membership and Confirm Details**\nAdd the membership to the profile. Review the auto-filled membership date and expiration date. Under the pay class option, select **\"Charge Account\"** — this tells the system to bill the membership fee to the customer's account so you can collect payment in the next step. Click **OK** and **Save**.\n\n> **Note:** The system auto-fills the membership and expiration dates. Selecting \"Charge Account\" is critical so the fee appears in the membership payment tool.\n\n![Confirm membership dates and select Charge Account as the pay class](screenshots/mem-001-step06.png)\n\n**Step 5: Confirm Membership Activation and Rate Update**\nVerify the membership now appears in the system. The customer's rate is automatically updated to the Trail Card membership for check-in. When prompted, click **Yes** to confirm the updated membership rate.\n\n![](screenshots/mem-001-paste3.png)\n\n**Step 6: Go to Tools and Open Membership Payment**\nNavigate to **Tools**, then select **Membership Payment**.\n\n![](screenshots/mem-001-paste5.png)\n**Step 7: Search for the Customer to Process Payment**\nClick **Search Customer**. Enter the customer profile information, then click **Search**. Select the customer and review the amount due. Enter the membership payment amount, then click **OK** to confirm.\n\n![Search for the customer and review the amount due for the membership](screenshots/mem-001-step12.png)\n\n![](screenshots/mem-001-paste6.png)\n\n**Step 8: (Optional) Combine Tabs into One Order**\nIf the customer has multiple items (e.g., tee time + membership) on separate POS tabs, you can combine them into one payment. Right-click within the tab and select **Add to Existing Order** to merge it with the current transaction. Click the customer name to assign the combined order.\n\n> **Note:** \"Tabs\" here refers to separate order tabs within the POS system (not browser tabs). Combining tabs lets the customer pay for everything in one transaction.\n\n![](screenshots/mem-001-paste7.png)\n![](screenshots/mem-001-paste8.png)\n\n**Step 9: Review Booking and Membership Details**\nVerify the tee time booking is present at the regular rate plus the membership ID.\n\n**Step 10: Pay and Print Receipt**\nClick **Pay** to begin processing the transaction. Complete payment for the entire transaction (membership + tee time fees). Click **Print Customer Receipt**, then click **OK**. \n\n![](screenshots/mem-001-paste9.png)\n\n**Step 11: Confirm the Trail Card Sale is Complete**\nConfirm the customer now has the tee time, payment, and membership added in one transaction.\n\n![The Trail Card sale is complete — tee time, payment, and membership all in one transaction](screenshots/mem-001-step25.png)",
  },

  {
    id: 'reg-016',
    title: "Redeem a Gift Card or Credit Voucher",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.0',
    keywords: ["redeem gift card","gift card payment","credit voucher","voucher redemption","gift card balance","pay with gift card"],
    relatedIds: ["reg-004","reg-006","reg-012"],
    media: [],
    content: "## Overview\nThis procedure covers how to redeem a gift card (credit voucher) as a payment method when a customer is checking out at the register. You can scan the card, type the number in, or search by customer name.\n\n## Step-by-Step\n\n**Step 1: Add Items to the Cart and Click Pay**\nAdd the item(s) the customer is purchasing to the cart as you normally would, then click **Pay** to begin the payment process. Click **OK** to confirm.\n\n![](screenshots/reg-016-paste2.png)\n\n**Step 2: Select Gift Card / Credit Voucher as Payment**\nClick the **Gift Card / Credit Voucher** payment option to begin the redemption process.\n\n![](screenshots/reg-016-paste3.png)\n\n**Step 3: Enter or Scan the Gift Card**\nYou have three options to locate the gift card:\n- **Scan** the gift card barcode\n- **Type** the gift card number directly into the field\n- Click the **magnifying glass** to search by gift card number or customer name\n![](screenshots/reg-016-paste4.png)\n\n**Step 4: Search and Select the Gift Card**\nIf searching, enter the gift card number or customer name. Once the correct card appears in the results, highlight it and click **Done**.\n![](screenshots/reg-016-paste5.png)\n\n\n**Step 5: Review and Confirm the Gift Card Balance**\nThe system displays the overall balance remaining on the gift card. Review the amount to confirm it covers the purchase (or note the remaining balance). Click **OK** to apply the gift card to the transaction.\n\n![](screenshots/reg-016-paste6.png)\n\n**Step 6: Complete Payment**\nThe gift card amount is applied to the transaction. The system prints a receipt that shows the remaining balance on the gift card — hand this to the customer so they know what they have left.\n\n> **Note:** If the gift card balance is less than the transaction total, you'll need to collect the remaining balance using another payment method (cash, credit card, etc.).\n",
  },

  {
    id: 'reg-017',
    title: "Redeem a Raincheck Voucher",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.0',
    keywords: ["redeem raincheck","rain check voucher","raincheck redemption","voucher payment","split payment","rain check balance"],
    relatedIds: ["reg-007","reg-008","reg-011"],
    media: [],
    content: "## Overview\nThis procedure covers how to redeem a rain check voucher when a customer returns to play. The raincheck value is applied as a payment, and if the new round costs more than the voucher balance, you'll use split pay for the remaining amount.\n\n## Step-by-Step\n\n**Step 1: Check In the Golfer from the Tee Sheet**\nRight-click the player's name on the **Tee Sheet** and select **Check-in** to begin the check-in process. This pulls them through to the register.\n\n![](screenshots/reg-017-paste12.png)\n\n**Step 2: Go to Pay and Select Gift Card / Credit Voucher**\nOnce the player is in the register, click **Pay**. Then click **Gift Card / Credit Voucher** as the payment method — rainchecks are stored as credit vouchers in the system.\n\n![](screenshots/reg-017-paste6.png)\n\n**Step 3: Access Customer Payment Options**\nClick **Customer**, then click **Payment Mode** to access the voucher lookup area.\n\n![](screenshots/reg-017-paste5.png)\n\n**Step 4: Check for Auto-Linked Rainchecks**\nBecause the customer was pulled in from the tee time, the system may automatically show any rainchecks tied to their profile. If the correct raincheck appears, you can select it directly.\n\n> **Note:** If the auto-linked raincheck shows a balance of zero or isn't the right one, you'll need to search manually in the next step.\n\n![](screenshots/reg-017-paste13.png)\n\n**Step 5: Search for the Raincheck (If Needed)**\nClick the **magnifying glass** to search. You can type in a voucher number or search by customer name. Click **Search**, then select the correct raincheck from the results.\n\n![](screenshots/reg-017-paste7.png)\n\n\n**Step 6: Review the Voucher Balance and Confirm**\nThe system shows the balance of the raincheck voucher. Review the amount and click **OK** to apply it to the transaction.\n\n![](screenshots/reg-017-paste8.png)\n\n**Step 7: Handle Split Payment (If Applicable)**\nIf the raincheck doesn't fully cover the round, the system will notify you of the remaining balance. Click **Yes** to proceed with split payment. The raincheck value is automatically applied, and the remaining amount appears as the balance due.\n\n> **Example:** If the raincheck balance is $49.05 and the round costs $63.22, the system applies the $49.05 and leaves $14.17 to be paid separately.\n\n![](screenshots/reg-017-paste9.png)\n\n**Step 8: Pay the Remaining Balance**\nSelect the payment method for the remaining amount (cash, credit card, etc.). Enter the amount and click **OK** to confirm.\n\n![](screenshots/reg-017-paste11.png)\n\n**Step 9: Finalize Payment**\nReview the transaction. Uncheck receipt boxes if not needed, then click **Pay** to finalize. The raincheck has been redeemed and any remaining balance paid.",
  },

  {
    id: 'reg-018',
    title: "Ring Through Prepaid Package Rounds",
    module: 'register',
    role: 'frontdesk',
    dateUpdated: '2026-02-23',
    version: '1.0',
    keywords: ["prepaid package","package round","prepaid check-in","group check-in","membership id","reservations account","ring through package"],
    relatedIds: ["reg-014","tee-002","tee-003"],
    media: [],
    content: "## Overview\nThis procedure covers how to check in and ring through prepaid package rounds at the register. When a group has a prepaid package booking (like a corporate outing or tournament), their rounds are charged to the facility's reservations account rather than collected at the counter.\n\n> **Important:** Make sure you're selecting your correct facility and the reservations account that belongs to your course.\n\n## Step-by-Step\n\n**Step 1: Locate the Booking on the Tee Sheet**\nFind the package group's booking on the **Tee Sheet**. Click into the booking to see the player list.\n![](screenshots/reg-018-paste1.png)\n![](screenshots/reg-018-paste2.png)\n**Step 2: Select the Players to Check In**\nCheck the boxes next to the players in the group who are ready to check in (for example, a foursome).\n![](screenshots/reg-018-paste3.png)\n**Step 3: Go to Group Check-In**\nRight-click the time and select **Group Check-in** to pull the selected players through to the register.\n![](screenshots/reg-018-paste4.png)\n**Step 4: Go to Pay**\nOnce the players have been pulled through the register, click **Pay** to begin the payment process.\n![](screenshots/reg-018-paste5.png)\n**Step 5: Select Membership ID**\nSelect **Membership ID** as the payment method. This is how prepaid package rounds are charged to the facility's reservations account.\n![](screenshots/reg-018-paste7.png)\n**Step 6: Search for the Reservations Account**\nClick the **magnifying glass** to search for the reservations account. Each course has its own corporate reservations account for package rounds.\n![](screenshots/reg-018-paste8.png)\n> **Note:** When searching, make sure you're selecting your correct facility and the reservations account that correlates back to your course.\n![](screenshots/reg-018-paste9.png)\n**Step 7: Select the Account and Confirm**\nSelect the correct reservations account and click **Done**. You'll see the account pulled through to the payment screen. Click **OK** to process the package round to that membership account.\n![](screenshots/reg-018-paste10.png)\n**Step 8: Complete and Print Receipt**\nRing through the transaction and print the receipt. The prepaid package round is now checked in and charged to the correct reservations account.",
  },


  // ── Food & Beverage App ──────────────────────────────────────
  {
    id: 'fb-001',
    title: "Log In to the F&B App",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["login", "pin", "clock in", "terminal", "role", "location", "register notes"],
    relatedIds: ["fb-002"],
    media: [],
    content: `## Overview

Log In To The F&B App 				
		In this quick lesson, you’ll learn how to log in to the Club Caddie Food & Beverage app the right way—selecting the correct Role, Location, and Terminal to ensure accurate reporting. You’ll practice entering your PIN, reviewing important Register Notes (like daily specials and reminders), and confirming you’re ready for service by checking your employee color and key screen details (Terminal, Chat, Version). You’ll also learn when to Clock In so you can start tabs without delays during your shift.


## Step-by-Step


**Step 1: Locate the Club Caddie F&B app icon on your tablet, then tap it to open the application**


**Step 2: At the top of the login screen, select your Role, Location, and Terminal for your shift**

Selecting the correct information is essential. It feeds directly into your facility’s reporting and accuracy. Your terminal may also include role-specific settings.


![Step 2](screenshots/fb-001-step01.png)


**Step 3: Enter your PIN using the on-screen PIN pad to log in**

Review any Register Notes shown on the PIN lock screen. These notes are set up by your facility in the desktop system under Register Settings → Register Notes and may include daily specials, promotions, or reminders.

After you log in, your assigned employee color will display on screen.


![Step 3](screenshots/fb-001-step02.png)


![Step 3](screenshots/fb-001-step03.png)


**Step 4: If needed, tap Clock In (bottom left) before starting service. Your facility may require you to be clocked in before you can start a tab**

If you cannot start a tab or cannot clock out, check with a manager. Your facility may be using desktop settings that block starting a tab when you’re not clocked in, or block clocking out when you have open tabs

Once you’re logged in, you’ll see the following information at the bottom of the screen:

• Terminal: Shows which terminal you’re currently logged into.

• Chat: Opens a pop-up window where you can contact support if you have questions.

• Version number: Displays the version you’re currently using. Be sure to reference this when requesting support and when confirming whether you’re up to date.


![Step 4](screenshots/fb-001-step04.png)


![Step 4](screenshots/fb-001-step05.png)


![Step 4](screenshots/fb-001-step06.png)
`,
  },
  {
    id: 'fb-002',
    title: "Understanding the F&B App Screen Layout",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["screen layout", "navigation", "tables", "tickets", "menu", "departments", "search bar", "fire", "pay", "save", "done", "receipt", "seats", "action buttons"],
    relatedIds: ["fb-001", "fb-003"],
    media: [],
    content: `## Overview

Navigation Overview 				
		In this lesson, you’ll get a guided tour of the Club Caddie F&B app’s main screen so you can move fast and stay organized during service. You’ll learn what each navigation button does (Tables, Open/Closed Tickets, Sales, and the Menu), how to find items quickly using Search and Departments, and how to use key action buttons like Fire, Save, Done, Receipt, and Pay. You’ll also learn how to read the ticket panel—table, seats, items, and ownership—so you always know exactly where every order stands.

		
		When you first login, you'll see the following navigation buttons:

(1) Hamburger Menu (☰) : Tapping this will open a menu with various options and settings for the app.

(2) Tables: Opens the visual floor planYou want to see which tables are occupied, assign a tab to a table, or start a new table orderTables are outlined in employee colors when occupied

(3) Your Name Button: You'll see a button displaying your name along with the number of tickets currently associated with you. This gives you a quick view of how many active tabs you're managing.

(4) Open Tickets: Shows all of your currently open tabs, so you can quickly return to an existing order to add items or check its status. Your tabs are highlighted in green and shown in your employee color.

(5) Closed Tickets: Displays completed and paid transactions, so you can reprint receipts, add tips, or review past orders. It may also include some open tickets—check the status indicator to confirm. (6) Sales (Bottom Right): View sales reports and performance data to review your shift sales, tip totals, and transaction history.

		
		Top of Screen: Search & Menu Navigation

(1) Search Bar: At the very top of your screen, you'll see a search bar. This is where employees can quickly search for particular menu items by typing in keywords. This is helpful when you need to find an item quickly without browsing through department menus.

(2) Department Buttons: Directly below the search bar, you'll see your department buttons (for example: Food, Beverages, Bar, etc.). These represent the main categories of items available at your facility.

(3) Sub-Department Items: When you tap on a department button, it will expand to show sub-department items, which typically include your menu items (appetizers, entrees, desserts, specific drinks, etc.).

		
		Right Side of Screen: TAB Details PanelThe right side of your screen is dedicated to displaying information about the current ticket you're working on. Let's walk through what you'll see from top to bottom:

(1) Customer Information: At the very top of the right panel, you may see customer information if a customer name has been added to the ticket. This field may or may not have information depending on whether you've entered it.

(2) Ticket Number: Directly below that is the ticket number—a unique identifier for this specific transaction.

(3) Table Number: Next, you'll see the table number (if you've selected a table). This shows which table this ticket is associated with.

(4) Server Name and Tab Number: Below the table information, you'll see the server name and tab number (displayed as "SE" followed by the tab number). This tells you which employee owns this ticket and which tab number it is in your queue.

(5) Seat Information: The seat section is where you can have one or multiple seats, allowing you to place specific orders for particular guests or seats at a table. This is helpful for keeping orders organized when serving multiple people at the same table.

(6) Plus Icon (+) : Next to the seat information, you'll see a plus icon. Tapping this allows you to add an additional seat to the ticket so you can track separate orders for each person.

(7) Ticket Items: Below the seat information, you'll see the ticket items that have been added to this order. Each item will display with its price, any modifiers, and which seat it's assigned to. We'll go through this area in much more depth in later sections.

		
		Bottom of Right Tab: Action ButtonsAt the bottom of the right panel, you'll see several action buttons that allow you to perform various functions. Here's what each button does:

(1) Add Prep Instructions : Allows you to add special preparation notes or instructions for the kitchen (e.g., "No onions," "Extra crispy," "Allergy: shellfish").

(2) Tax Exempt: Use this button if the transaction qualifies for tax exemption. This will remove applicable taxes from the ticket.

(3) Service Charge Exempt: Use this button if the transaction should be exempt from automatic service charges or gratuity.

(4) Totals: Displays a breakdown of the ticket totals, including subtotal, tax, service charges, and the final total.

(5) Fire: Sends items to the kitchen to begin preparation. This is used in coursing workflows when you want to control the timing of when dishes are prepared.

(6) Save: Saves your current work on the ticket without closing it. Use this when you need to step away or switch to another tab temporarily but aren't finished with this order yet.

(7) Done: Completes your work on the ticket and closes it, sending any pending items to the kitchen. Use this when you've finished taking the order and are ready to move on.

(8) Cancel: Cancels any unsaved changes you've made to the ticket and returns it to its previous state.

(9) Receipt: Generates and prints a receipt for the ticket. This can be used for pre-receipts (before payment) or final receipts (after payment).

(10) Open: Opens the cash register drawer.

(11) Pay: Takes you to the payment screen where you can process credit cards, cash, or other payment methods to close out the ticket.



![Reference](screenshots/fb-002-step01.png)


![Reference](screenshots/fb-002-step02.png)


![Reference](screenshots/fb-002-step03.png)


![Reference](screenshots/fb-002-step04.png)
`,
  },
  {
    id: 'fb-003',
    title: "How to Take Orders and Add Items",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["take orders", "add items", "menu navigation", "search", "modifiers", "special instructions", "repeat item", "edit item", "department"],
    relatedIds: ["fb-002", "fb-004"],
    media: [],
    content: `## Overview

How To Take Orders And Add Items Overview 				
		In this lesson, you’ll learn how to take orders in the Club Caddie F&B app by finding and adding menu items using menu navigation (Department → Sub-Department → Category → Items) or the Search bar for faster entry. You’ll practice applying required modifiers (so items can be sent) and selecting optional modifiers to customize orders, including when pricing updates on the ticket. You’ll also learn how to add special instructions, use Repeat to quickly add duplicates, and edit items after adding them to correct or adjust orders without starting over.

		
		Navigating the Menu • Menu items are organized in a clear hierarchy to make them easy to locate: Department → Sub-Department → Category → Items. Start broad (like Food or Beverages), then narrow down until you find the exact item to add. Items will appear after you click on the category.

Finding a Menu Item• You can add an item by tapping through the menu structure until it appears, then selecting it to place it on the order. Once added, the item appears in the order summary where you can adjust quantity or remove it if needed.

Using the Search Bar• Search is the fastest way to add items when you already know the item name. Start typing and select the item from the results to add it directly to the order without navigating through menu categories.

Adding Items with Basic Modifiers• Some items require modifier selections before they can be sent to the kitchen (for example, cooking temperature, side choice, or dressings). Modifiers ensure the kitchen receives the item exactly as intended.

Required Modifiers• Required modifiers are typically indicated visually (often with an asterisk) and must be selected before the item is eligible to be sent to the kitchen.
• If required modifiers aren’t chosen, the system will prevent the item from being sent.

Optional Modifiers• Optional modifiers allow customization such as add-ons, upgrades, or extras. Some optional modifiers may increase the item price, and the updated cost will display on the ticket once selected.

Special Instructions• Special instructions are free-text prep notes that communicate specific requests to the kitchen (such as “no salt,” “extra crispy,” or allergy notes). These instructions print on kitchen tickets so staff can prepare the item correctly.

Repeat Item• The Repeat function is a quick way to add another of the same item to an order (useful for multiple drinks or duplicate items). Depending on your setup, repeated items may require modifiers to be selected again.

Editing an Item After Adding It• Items can be edited after they’ve been added, including changing modifier selections or updating instructions. Updates apply directly to the item on the ticket, helping you correct or adjust orders without starting over.



![Reference](screenshots/fb-003-step01.png)


![Reference](screenshots/fb-003-step02.png)


![Reference](screenshots/fb-003-step03.png)


![Reference](screenshots/fb-003-step04.png)


![Reference](screenshots/fb-003-step05.png)


![Reference](screenshots/fb-003-step06.png)


![Reference](screenshots/fb-003-step07.png)


![Reference](screenshots/fb-003-step08.png)


![Reference](screenshots/fb-003-step09.png)
`,
  },
  {
    id: 'fb-004',
    title: "Using Modifiers",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["modifiers", "required modifier", "optional modifier", "upcharge", "red asterisk", "customization"],
    relatedIds: ["fb-003", "fb-005"],
    media: [],
    content: `## Overview

Using Modifiers				
		In this lesson, you’ll learn how to confidently select and manage modifiers in the Club Caddie F&B app while building a tab. You’ll practice spotting required modifiers (red asterisk) and clearing red-outlined items, adding optional customizations based on guest requests, and watching for upcharges as you select options. You’ll also learn how to review modifiers on the ticket and quickly edit selections after an item is added—so every order is accurate before it goes to the kitchen.

		
					Modifiers display directly beneath the item on the same screen (no pop-ups), and are arranged horizontally to save space.


## Step-by-Step


**Step 1: Open the F&B app and select the tab you’re adding items to**


**Step 2: Tap an item on the menu. Review the modifier options that appear directly beneath the item (on the same screen)**


![Step 2](screenshots/fb-004-step01.png)


**Step 3: Select any required modifiers (marked with a red asterisk *). If required modifiers are missing, the item will stay outlined in red until you complete the required selections**

Add any optional modifiers as needed based on the guest’s request. Optional modifiers can be skipped if the guest does not need changes.


![Step 3](screenshots/fb-004-step02.png)


![Step 3](screenshots/fb-004-step03.png)


**Step 4: Watch for modifier upcharges shown next to modifier options. If a modifier has no additional charge, it will list the modifier name with no price displayed**


**Step 5: Review the item on the right side of the screen to confirm the selected modifiers (and any added cost) are listed correctly with the order**


![Step 5](screenshots/fb-004-step04.png)


**Step 6: To edit modifiers after the item is added, tap the item on the right side of the screen. Once you tab the item, the modifiers will appear on the left again to update your selections**

Example Scenario:
A guest orders Prime Rib and wants it cooked medium rare. The server taps Prime Rib, then selects the required meat temperature modifier (marked with a red asterisk) to clear the red outline. The guest also asks to remove bell peppers and add extra jalapeños on a topping group, so the server selects those optional modifiers. The guest upgrades to onion rings as a side, and the app displays the $2 upcharge (plus $0.50 for “extra” if selected). Before sending to the kitchen, the server taps the item in the order summary to confirm all modifiers are correct.


![Step 6](screenshots/fb-004-step05.png)


![Step 6](screenshots/fb-004-step06.png)
`,
  },
  {
    id: 'fb-005',
    title: "Meal Coursing",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["coursing", "fire", "send by course", "appetizer", "entree", "dessert", "kitchen timing"],
    relatedIds: ["fb-006", "fb-003"],
    media: [],
    content: `## Overview

Meal Coursing 				
		In this lesson, you’ll learn how to use coursing in the Club Caddie F&B app to control when items are sent to the kitchen—so food comes out at the right time. You’ll practice assigning items to a course on the tab, double-checking any items that didn’t auto-fill, and using Send by Course to fire only the course you’re ready for. By the end, you’ll be able to pace service smoothly (apps, entrées, desserts, to-go) without re-entering orders or sending everything at once.

		
						Courses are set up in your facility’s desktop system settings. If an item has a default course assigned in Inventory Center, it will auto-fill on the tab—otherwise it will be blank until you choose one. You can always change the course however in the order summary.
						
									&times;
							
						Example Scenario:
						A foursome sits down for dinner and orders appetizers, entrées, and desserts all at once. The server assigns the appetizers to the Appetizer course and the steaks to the Entrée course, then taps Send by Course to fire only the Appetizers. Once the group is almost finished, the server returns to the tab and fires the Entrées so the kitchen starts them at the right time. After dinner, the server fires Desserts so they print together for faster prep and plating.
						
									&times;


## Step-by-Step


**Step 1: Open a tab and add items as normal. As you add each item, assign it to a course (like Appetizer, Entrée, Dessert, or To Go) by tapping the item on the right side of the tab and selecting a course from the dropdown**


**Step 2: Review the course assignment for each item. If an item didn’t auto-assign a course, tap it and choose the correct course before you send anything to the kitchen**


![Step 2](screenshots/fb-005-step01.png)


**Step 3: Tap the fire icon/Send button. When the send options appear, you can choose to send by course (instead of sending all items at once)**


![Step 3](screenshots/fb-005-step02.png)


**Step 4: Select the course you want to send. Only the items assigned to that course will print in the kitchen, and the rest will stay on the tab until you send them**

When you’re ready for the next part of service, return to the same tab and repeat to send by course or by individual item.


![Step 4](screenshots/fb-005-step03.png)


![Step 4](screenshots/fb-005-step04.png)
`,
  },
  {
    id: 'fb-006',
    title: "How to Send Orders to the Kitchen",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["fire", "send", "kitchen", "send all items", "send by course", "send individual"],
    relatedIds: ["fb-005", "fb-003"],
    media: [],
    content: `## Overview

Send Orders To The Kitchen 				
		Learn how to send items to the kitchen using the Fire function, confirm what was sent, and send additional items later.

		
					Open the tab and add all items to the order. Review the item list to confirm quantities, modifiers, and special instructions are correct. Also, Check for any items that still need required modifiers. If an item is marked as incomplete (required modifiers not selected), complete those modifiers before firing so the item can be sent.

				
						Example Scenario:
						A table orders appetizers and entrées, but they want the entrées held until later. You enter all items, then tap Fire and choose Send by Course to send only the appetizers. After the appetizers are served, you tap Fire again and send the entrée course. Halfway through the meal, the table adds a side of fries—after you add it, you see it has no fire icon, so you tap Fire to send only that new item to the kitchen.
						
									&times;


## Step-by-Step


**Step 1: Tap the Fire icon button (usually in the bottom right of the screen). A menu may appear with firing options**


**Step 2: Choose the firing method that matches your service:**

Select Send All Items to send everything on the order that has not been fired yet (most common).

Select Send by Course to send only items assigned to a specific course (Appetizer, Entrée, Dessert, etc.) for staged service.

Select Send Individual Items to select specific items to send (used for special situations).


![Step 2](screenshots/fb-006-step01.png)


**Step 3: Confirm the items were sent by checking the order list. A fire indicator/icon should appear next to each item you fired. If an item does not show a fire icon, it was not sent**


![Step 3](screenshots/fb-006-step02.png)


**Step 4: Continue service as needed. You can keep adding items to the same tab after firing**


![Step 4](screenshots/fb-006-step03.png)


**Step 5: When you add new items after firing, the new items will appear without a fire icon. Tap Fire again to send only the new, unfired items—previously fired items are not resent**


![Step 5](screenshots/fb-006-step04.png)


**Step 6: Do a final check before closing the tab to confirm all items that should be prepared have been fired and show the fire icon**


![Step 6](screenshots/fb-006-step05.png)


![Step 6](screenshots/fb-006-step06.png)
`,
  },
  {
    id: 'fb-007',
    title: "How to Create and Manage Seats",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["seats", "add seat", "split", "guest", "move item", "separate check"],
    relatedIds: ["fb-014", "fb-010"],
    media: [],
    content: `## Overview

Create And Manage Seats 				
		In this lesson, you’ll learn how to use Seats in the Club Caddie F&B app to keep each guest’s order organized and ready for separate payment. You’ll practice adding seats, assigning items to the active seat as you order, and correcting mistakes by moving items to the right seat from the Summary view. You’ll also learn how to split by seat, then open each split check from Open Tickets to take individual payments quickly and accurately.

		
						Example Scenario:
						A foursome finishes lunch and asks to pay separately. You open their tab, tap the + in the Seats area to create Seat 1–Seat 4, then select each seat before entering that guest’s items. One soda was added to the wrong seat, so you tap the item in the Summary list and move it to the correct seat. When they’re ready, you tap Split to separate the checks and then open each ticket to collect payment one guest at a time.
						
									&times;


## Step-by-Step


**Step 1: Open the tab, then look for the Seats area on the bottom right of the screen. Tap the + button (Add Seat) to create Seat 1, then tap + again to add Seat 2, Seat 3, and so on (one per guest who needs a separate check)**


**Step 2: Tap a seat (for example, Seat 1) to make it active, then add items using the menu as normal. Items you add while a seat is selected automatically assign to that seat**


![Step 2](screenshots/fb-007-step01.png)


**Step 3: Repeat for each guest by selecting the next seat (Seat 2, Seat 3, etc.) and adding that guest’s items**


![Step 3](screenshots/fb-007-step02.png)


**Step 4: If you added items to the wrong seat, tap the Summary view (or the list that shows all items), tap the item you need to fix, then choose the option to move/assign it to the correct seat (for example, “Move to Seat” or “Assign Seat”) and select the right seat**


![Step 4](screenshots/fb-007-step03.png)


**Step 5: When guests are ready to pay separately, open the tab and quickly review each seat to confirm items are in the correct place**


![Step 5](screenshots/fb-007-step04.png)


**Step 6: Tap Split (often located near the bottom right). In the split window, choose whether to keep seats separate or combine specific seats, then confirm. Each seat becomes its own check ready for payment**


![Step 6](screenshots/fb-007-step05.png)


**Step 7: Tap Open Tickets and open each split check, then process payment for each guest individually**


![Step 7](screenshots/fb-007-step06.png)


![Step 7](screenshots/fb-007-step07.png)
`,
  },
  {
    id: 'fb-008',
    title: "How to Open a Tab",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["open tab", "tables", "quick tab", "customer search", "member", "bar", "walk-up"],
    relatedIds: ["fb-009", "fb-001"],
    media: [],
    content: `## Overview

Opening Tabs 				
		In this lesson, you’ll learn how to open tabs in the Club Caddie F&B app using the best method for each service style—Tables for seated dining, Quick Tab for fast bar/snack orders, and Plus (+) customer search for members or known guests. You’ll practice selecting the right table or customer, starting orders immediately, and understanding how tab numbers and customer links work. By the end, you’ll be able to launch tabs quickly during rushes while keeping orders accurate and easy to manage.


## Step-by-Step


**Step 1: From the F&B home screen, open a tab using the method that fits your service:**

(1) Tap Tables (bottom left navigation) to open a tab assigned to a specific table (best for table service).

(2) Tap Quick Tab (top middle of the screen) to open a new numbered tab with no table and no customer info (best for quick service, bar orders, and walk-ups).

(3) Tap the Plus (+) button (top middle of the screen) to search by customer name, phone, email, or member ID, then select an existing customer or create a new profile (best for members or known customers).


**Step 2: If you opened from Tables, tap an available table on the floor plan (for example, “S2” or “B”). A new tab opens immediately and is linked to that table**


![Step 2](screenshots/fb-008-step01.png)


**Step 3: If you used Quick Tab, start adding items immediately. The system assigns a sequential tab number (for example, “Tab #1234”) and does not require a table or customer**


![Step 3](screenshots/fb-008-step02.png)


**Step 4: If you used the Plus (+) button to attach a customer (or you used Card Tab if enabled at your facility), confirm you selected the correct person before adding items. This ensures the tab is linked to the right member/customer record**


![Step 4](screenshots/fb-008-step03.png)


**Step 5: Continue taking the order by adding items to the tab, then send items as needed (for example, to the kitchen)**

When choosing a method, use these quick guidelines:
Use Tables when you need table tracking and section organization.
Use Quick Tab when there is no table (snack bar, bar guests not seated, walk-ups, to-go).
Use the Plus (+) customer search when you need the tab tied to a specific member/customer.

				
					Example Scenario:
Your snack bar gets a rush after the turn, and you need to move quickly. You tap Quick Tab to start a to-go order immediately, add items, and send them to the kitchen. A member walks up next and asks to charge to their account, so you use Card Tab to scan their member card and confirm their name before adding items. Later, you tap Open Tickets to switch between the two tabs and close each one as soon as payment is completed to keep the list clean.


![Step 5](screenshots/fb-008-step04.png)


![Step 5](screenshots/fb-008-step05.png)
`,
  },
  {
    id: 'fb-009',
    title: "How to Switch Between Tabs",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["switch tabs", "open tickets", "employee color", "auto save", "done button"],
    relatedIds: ["fb-008", "fb-010"],
    media: [],
    content: `## Overview

Switch Between Tabs 				
		In this lesson, you’ll learn how to confidently juggle multiple guests by switching between open tabs in the Club Caddie F&B app. You’ll practice using Open Tickets to find tabs by employee color, table, guest name, or tab number—and quickly jump between them while the app auto-saves your work. You’ll also learn where paid tabs go (Closed Tickets) and understand the key difference between switching tabs and tapping Done to return to the PIN screen for the next employee.

		
						Tapping Open Tickets auto-saves your work and keeps you logged in. Paid tabs close automatically and move to Closed Tickets.
						
									&times;


## Step-by-Step


**Step 1: From anywhere in the app, tap Open Tickets in the bottom navigation to view the list of all open tabs**


**Step 2: Find the tab you want by looking for your employee color and locating it by table number, guest name, or tab number**


![Step 2](screenshots/fb-009-step01.png)


**Step 3: Tap the tab to open it. You can now add items, fire items to the kitchen, review the order, or take payment**


![Step 3](screenshots/fb-009-step02.png)


**Step 4: To switch to another tab, tap Open Tickets again (your work saves automatically), then tap the next tab you want to work on**


![Step 4](screenshots/fb-009-step03.png)


**Step 5: If you have permission to view everyone’s tabs, use the All Tabs view next to Quick Tab at the top to filter by a specific user or view all users. All open tabs display color-coded by employee**


![Step 5](screenshots/fb-009-step04.png)


**Step 6: When you are done and want to return to the sign-in screen for the next employee, tap Done (bottom right). This returns to the PIN lock screen (it is not the same as switching tabs)**


![Step 6](screenshots/fb-009-step05.png)


**Step 7: To review tabs that have already been paid, tap Closed Tickets to view closed tabs from the current shift**

Example Scenario:
You have three active tabs during a busy lunch rush—one table, one bar guest, and one walk-up order. You tap Open Tickets to see all open tabs and quickly identify yours by your employee color. You open the table tab to add a drink, then tap Open Tickets to jump to the bar tab to fire an appetizer. After closing a paid tab, it disappears from Open Tickets, and you can find it later under Closed Tickets if you need to reference it.


![Step 7](screenshots/fb-009-step06.png)


![Step 7](screenshots/fb-009-step07.png)


![Step 7](screenshots/fb-009-step08.png)


![Step 7](screenshots/fb-009-step09.png)
`,
  },
  {
    id: 'fb-010',
    title: "Assign Items to Other Tabs After a Split",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["move item", "split", "reassign", "new seat order", "tab", "move item to"],
    relatedIds: ["fb-007", "fb-014"],
    media: [],
    content: `## Overview

Assign Items To Other Tabs After An Order Has Been Split 				
		In this lesson, you’ll learn how to fix a split order by moving a single item to a different tab—or creating a brand-new tab—without starting over. You’ll practice opening a ticket with multiple tabs, selecting the correct tab, and using Move Item to to send an item to an existing tab or Add to New Seat Order. By the end, you’ll be able to quickly adjust checks when guests change their minds about paying separately, keeping every tab accurate before checkout.

		
						Example Scenario:
						A group at the turn starts on one tab, but one golfer decides to pay separately after the order is already split. The operator opens the ticket, taps the tab with the golfer’s beverage, and uses Move Item to to send that item to a new seat order. After the system saves, the operator taps the new tab to confirm the item is there. The group can now check out with the correct items on each tab.
						
									&times;


## Step-by-Step


**Step 1: Open the ticket that has already been split. You should see multiple tabs across the top of the order panel Ex. Tab 1, Tab 2, Tab 3, etc**


**Step 2: Tap the tab that currently contains the item you need to move**


![Step 2](screenshots/fb-010-step01.png)


**Step 3: Tap the Move Item to dropdown, then select where you want the item to go:**

• Select Tab 1 / Tab 2 / Tab 3 / … to move it to an existing tab, or

• Select Add to New Seat Order to create a new tab and move the item there.

Wait for the order to finish saving. You may briefly see a message like “saving an order…”


![Step 3](screenshots/fb-010-step02.png)


**Step 4: Tap Done to close the item options panel**


![Step 4](screenshots/fb-010-step03.png)


**Step 5: Tap the destination tab to confirm the item moved to the correct tab (or that the new tab was created and contains the item)**


![Step 5](screenshots/fb-010-step04.png)


![Step 5](screenshots/fb-010-step05.png)
`,
  },
  {
    id: 'fb-011',
    title: "How to Review Closed Tickets",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["closed tickets", "reprint receipt", "tip incomplete", "transaction history", "tip"],
    relatedIds: ["fb-012", "fb-009"],
    media: [],
    content: `## Overview

Navigation Overview 				
		In this lesson, you’ll learn how to use Closed Tickets in the Club Caddie F&B app to review completed transactions from your shift. You’ll practice opening a closed ticket to confirm order details, totals, and payment info, and you’ll learn how to handle tickets marked Tip Incomplete by entering the tip from a signed receipt. You’ll also learn how to quickly reprint receipts—so you can respond to guest requests and keep end-of-shift records accurate.

		
						Example Scenario:
						A guest calls saying they need a copy of their receipt from earlier in the day. You tap Closed Tickets, find their transaction, open it, and reprint the receipt. Later, you notice a ticket marked Tip Incomplete, so you open it and enter the tip from the signed slip before finishing your shift.
						
									&times;
							
		Tickets move to Closed Tickets after payment is completed. If your facility uses tip-on-receipt, some tickets may show as Tip Incomplete until tips are entered.


## Step-by-Step


**Step 1: In the bottom navigation, tap Closed Tickets (near Tables, Open Tickets, and Sales)**


**Step 2: Review the list of closed tickets from your shift. These include cash payments, credit card payments, member charges, and any transactions with tips**


![Step 2](screenshots/fb-011-step01.png)


**Step 3: Tap a ticket to open it and review the completed transaction details (items ordered, totals, and payment information)**


![Step 3](screenshots/fb-011-step02.png)


**Step 4: If a ticket shows Tip Incomplete, open the ticket and enter the tip amount (based on the signed receipt), then save/confirm so the tip is applied**


![Step 4](screenshots/fb-011-step03.png)


**Step 5: To reprint a receipt, open the ticket from Closed Tickets and select the receipt/print option to print the receipt again**


![Step 5](screenshots/fb-011-step04.png)


![Step 5](screenshots/fb-011-step05.png)


![Step 5](screenshots/fb-011-step06.png)
`,
  },
  {
    id: 'fb-012',
    title: "How to Process Payments",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["payment", "cash", "credit card", "pay", "change due", "receipt", "member charge", "clover"],
    relatedIds: ["fb-013", "fb-014"],
    media: [],
    content: `## Overview

Process Payments 				
		In this lesson, you’ll learn how to close tabs confidently in the Club Caddie F&B app by processing payments from start to finish. You’ll practice selecting a tab from Open Tickets, reviewing the balance due, and using Pay to accept common methods like cash (including entering the amount received and confirming change due) and credit card (following on-screen prompts and device approval). You’ll also learn how receipt options work (Print, Email, or Close) and how to handle other workflows like member charges, event charges, and split payments so every tab closes accurately.

		
						Example Scenario:
						A guest pays cash for a $37.50 snack bar tab. You open the ticket, tap Pay, choose Cash, enter 50.00, and the system shows $12.50 change due. Later, a dining guest pays by card, so you tap Pay, choose the Clover Go card option, and the guest completes the payment on the device. After they add a tip on the iPad and you select a receipt option, the ticket closes.
						
									&times;
							
					Payment button and receipt options may vary by setup. Follow the on-screen prompts to finalize payment and close the tab.


## Step-by-Step


**Step 1: Tap Open Tickets and select the tab you want to close. Review the balance due, then tap Pay**


**Step 2: On the payment method screen, choose how the guest is paying (Cash, Card, membership ID etc.)**


![Step 2](screenshots/fb-012-step01.png)


**Step 3: For cash payments, tap Cash, enter the amount received (for example, enter 70.00 if the guest gives you $70), then select Pay. The system calculates the change due**


![Step 3](screenshots/fb-012-step02.png)


**Step 4: For credit card payments, tap the card option used at your facility (commonly Card External for a Clover Go device)**

Process the card payment on the Clover Go device (tap/insert/swipe) and follow the prompts until the device shows approval.
If prompted on the iPad, have the guest add a tip and sign (if required), then confirm to finalize the payment.


![Step 4](screenshots/fb-012-step03.png)


![Step 4](screenshots/fb-012-step04.png)


**Step 5: Select a receipt option (Print, Email, or Close). Once completed, the tab closes and no longer appears as unpaid in Open Tickets**

Other Payment Methods

Member Charge: Tap Pay, select Membership ID. System automatically shows selected member if customer was already assigned to tab, or prompts to search for member. [NEED MORE INFO - confirm if member card scanning is available or manual entry only]. Charge posts to member's account.

Charge to Event: Tap Pay, select Event Charge, You can either search for the event by name in the search bar, or select the magnifying glass to view the list of events.

Split Payment (Multiple Payment Methods on One Tab): Tap Pay, select first payment method (e.g., Cash), enter partial amount (e.g., $50 of $100 total), system calculates remaining balance ($50), select second payment method (e.g., Card External), process card for remaining $50. Both payments complete and tab closes.

		
						The Done button returns to PIN screen (does NOT close the tab or process payment). The Pay button initiates payment process and closes the tab when payment complete.
						
									&times;


![Step 5](screenshots/fb-012-step05.png)


![Step 5](screenshots/fb-012-step06.png)


![Step 5](screenshots/fb-012-step07.png)


![Step 5](screenshots/fb-012-step08.png)


![Step 5](screenshots/fb-012-step09.png)


![Step 5](screenshots/fb-012-step10.png)
`,
  },
  {
    id: 'fb-013',
    title: "Opening Drawer & Pre-Receipts",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["open drawer", "pre-receipt", "cash drawer", "receipt", "running total", "bar"],
    relatedIds: ["fb-012", "fb-011"],
    media: [],
    content: `## Overview

Opening Drawer & Pre-Receipts 				
		You’ll learn how to use two cash-handling tools in the Club Caddie F&B app: printing pre-receipts and using Open Drawer. You’ll practice printing a pre-receipt from an open tab so guests can review totals without closing the tab, and opening the cash drawer from the main screen for change-making or shift tasks. You’ll also learn the difference between a pre-receipt (before payment, tab stays open) and a final receipt (after payment, tab closes) so you print the correct receipt every time.

		
						Example Scenario:
						A bartender has a guest running a tab and the guest asks to see their total before closing out. The bartender opens the tab and taps Receipt to print a pre-receipt for review, then keeps the tab open while the guest decides how they want to pay. Later, the bartender needs to make change for another cash customer, so they tap Open Drawer from the main screen to access the cash drawer without starting a new transaction.
						
									&times;
							
					The cash drawer must be physically connected to the receipt printer. The drawer opens through that printer connection.


## Step-by-Step


**Step 1: To print a pre-receipt, open the tab you want to print**


**Step 2: On the tab screen, tap Receipt (bottom right). A pre-receipt prints showing the current items, subtotal, tax, and total due. The tab stays open because the guest has not paid yet**

Use the pre-receipt when a guest wants to review their running total before paying (common at the bar, in cash-heavy environments, or when presenting a check at the end of a meal).


![Step 2](screenshots/fb-013-step01.png)


![Step 2](screenshots/fb-013-step02.png)


**Step 3: To open the cash drawer without processing a payment, go to the main screen and tap Open Drawer**


**Step 4: The connected cash drawer opens. Complete your cash handling (make change, add/remove cash, start/end-of-shift tasks) and close the drawer manually**


![Step 4](screenshots/fb-013-step03.png)


**Step 5: Know the difference between receipt types so you print the right one:**

Pre-Receipt: Printed before payment, shows current items and total, tab remains open, no payment method shown, printed using the Receipt button on an open tab.

Final Receipt: Printed after payment, shows items, total, payment method, and tip (if applicable), and the tab is closed after payment is completed.
`,
  },
  {
    id: 'fb-014',
    title: "How to Split a Check by Seat",
    module: 'fb-app',
    role: 'staff',
    dateUpdated: '2026-02-25',
    version: '1.0',
    keywords: ["split check", "split by seat", "separate checks", "seat", "individual payment"],
    relatedIds: ["fb-007", "fb-012"],
    media: [],
    content: `## Overview

Split A Check By Seat 				
		In this lesson, you’ll learn how to split a single tab into separate checks by seat so each guest can pay individually. You’ll practice reviewing the Seats view, correcting seat assignments before splitting, and using Split by Seat to convert one tab into multiple tabs. You’ll also learn how to find the new tabs in Open Tickets and close each check with the correct payment—without mixing items between guests.

		
						Example Scenario:
						A table of three wants separate checks. You open the tab, switch to Seats view, and confirm each guest’s items are assigned to Seat 1, Seat 2, and Seat 3. You tap Split by Seat and confirm, which creates three separate tabs in Open Tickets. You open each tab one at a time, take payment, and close each ticket as the guests finish paying.
						
									&times;
							
					Splitting by seat converts one tab into multiple separate tabs. Before splitting, you must create seats and assign all items to the correct seats. Once split, tabs are separate and cannot be re-combined, so verify seat assignments before you split.


## Step-by-Step


**Step 1: Tap Open Tickets and select the tab you want to close. Review the balance due, then tap Pay**


**Step 2: On the payment method screen, choose how the guest is paying (Cash, Card, membership ID etc.)**


![Step 2](screenshots/fb-014-step01.png)


**Step 3: For cash payments, tap Cash, enter the amount received (for example, enter 70.00 if the guest gives you $70), then select Pay. The system calculates the change due**


![Step 3](screenshots/fb-014-step02.png)


**Step 4: For credit card payments, tap the card option used at your facility (commonly Card External for a Clover Go device)**

Process the card payment on the Clover Go device (tap/insert/swipe) and follow the prompts until the device shows approval.
If prompted on the iPad, have the guest add a tip and sign (if required), then confirm to finalize the payment.


![Step 4](screenshots/fb-014-step03.png)


![Step 4](screenshots/fb-014-step04.png)


**Step 5: Select a receipt option (Print, Email, or Close). Once completed, the tab closes and no longer appears as unpaid in Open Tickets**

Other Payment Methods

Member Charge: Tap Pay, select Membership ID. System automatically shows selected member if customer was already assigned to tab, or prompts to search for member. [NEED MORE INFO - confirm if member card scanning is available or manual entry only]. Charge posts to member's account.

Charge to Event: Tap Pay, select Event Charge, You can either search for the event by name in the search bar, or select the magnifying glass to view the list of events.

Split Payment (Multiple Payment Methods on One Tab): Tap Pay, select first payment method (e.g., Cash), enter partial amount (e.g., $50 of $100 total), system calculates remaining balance ($50), select second payment method (e.g., Card External), process card for remaining $50. Both payments complete and tab closes.


![Step 5](screenshots/fb-014-step05.png)


![Step 5](screenshots/fb-014-step06.png)


![Step 5](screenshots/fb-014-step07.png)


![Step 5](screenshots/fb-014-step08.png)


![Step 5](screenshots/fb-014-step09.png)


![Step 5](screenshots/fb-014-step10.png)
`,
  },

  // ── Inventory Module ──────────────────────────────────────

  {
    id: 'inv-001',
    title: "Receive Items Using the Purchase Order (PO) Module",
    module: 'inventory',
    role: 'staff',
    dateUpdated: '2026-02-27',
    version: '1.0',
    keywords: ["purchase order","PO","receive inventory","receive items","check in merchandise","vendor","backorder","Ashleynn","PO number","PO module","club prophet","receive transfer"],
    relatedIds: ["inv-002","inv-003"],
    media: [],
    content: `## Overview
The Purchase Order (PO) module is the **primary way** to receive merchandise at RTJ. Whether the order was placed by Ashleynn (corporate purchasing) or by you directly, every delivery should have a corresponding PO in the system. You receive items in the same place you create the PO — do **not** use the Receive/Transfer Inventory tab for PO items.

## When to Use
- Ashleynn ordered items for your shop — they will already be in the PO module. You receive them there.
- You ordered something yourself from a vendor — you should have created a PO first. Receive items against that same PO.
- Any time merchandise arrives **and** a PO exists in the system.

## Why POs Matter
- **Tracking:** A PO number gives you a reference back to every order.
- **Accuracy:** Helps you avoid checking in ball orders that were not actually ordered.
- **Backorders:** Makes it easy to tell the difference between a backorder and a future order.
- **Reporting:** Receiving against the PO closes it out and gives you meaningful reporting data.

## Step-by-Step

**Step 1: Open the PO Module**
Navigate to the Purchase Order module from the main menu.

<!-- Screenshot needed: PO module location in main menu -->

**Step 2: Locate the Purchase Order**
Find the PO for the delivery you are receiving. If Ashleynn placed the order, the PO will already be listed. If you placed the order, find the PO number you gave to the vendor.

<!-- Screenshot needed: PO list screen -->

**Step 3: Receive Items Against the PO**
Open the PO and receive the items. This works the same as Club Prophet — you create the PO and receive items in the same place.

<!-- Screenshot needed: Receiving screen within a PO -->

**Step 4: Verify and Close**
Confirm the quantities match what was delivered. The PO will close out once all items are received.

<!-- Screenshot needed: Completed/closed PO -->

## Important Reminders
- **All orders should have a PO.** When you order from a vendor, create a PO first and give the vendor the PO number.
- **Do NOT create POs and then receive in the Receive/Transfer Inventory tab.** This will not close the PO and adds an unnecessary step with no meaningful reporting.
- If something is delivered without a PO, see the article: *Receive Items Without a Purchase Order*.
`,
  },

  {
    id: 'inv-002',
    title: "Receive Items Without a Purchase Order",
    module: 'inventory',
    role: 'staff',
    dateUpdated: '2026-02-27',
    version: '1.0',
    keywords: ["receive inventory","no PO","no purchase order","receive transfer","unexpected delivery","receiving inventory module"],
    relatedIds: ["inv-001","inv-003"],
    media: [],
    content: `## Overview
In rare cases, merchandise may arrive at your shop without a corresponding Purchase Order (PO) in the system. When this happens — and **only** when this happens — use the Receive Inventory module to check the items in. Do not create a PO after the fact for something already sitting in front of you.

## When to Use
- An item was delivered that was **never entered** into the PO system.
- You have physical merchandise in hand but no PO exists for it.

> **Note:** This should be uncommon. All orders placed by Ashleynn or by you should have a PO. If you find yourself using this method frequently, check with your manager to make sure orders are being entered into the PO system properly.

## Step-by-Step

**Step 1: Open the Receive Inventory Module**
From the main menu, navigate to the Receive/Transfer Inventory section.

<!-- Screenshot needed: Receive Inventory module location -->

**Step 2: Enter the Item Details**
Enter the item information for what was delivered — item name, quantity, vendor, and cost.

<!-- Screenshot needed: Receive Inventory entry screen -->

**Step 3: Save and Confirm**
Save the received items. They will now appear in your inventory.

<!-- Screenshot needed: Confirmation screen -->

## Important Reminders
- **Do NOT use this method for items that have a PO.** Always receive PO items through the PO module.
- There is no need to create a PO for something already in front of you — that defeats the purpose of a PO.
- The purpose of a PO is to know what has been ordered and have a number to reference. If the item is already here, just receive it directly.
`,
  },

  {
    id: 'inv-003',
    title: "Print an Inventory Count Sheet Without Starting an Audit",
    module: 'inventory',
    role: 'staff',
    dateUpdated: '2026-02-27',
    version: '1.0',
    keywords: ["inventory count","count sheet","audit","print count sheet","excel","inventory center","merchandise","scanning","physical count","monthly count"],
    relatedIds: ["inv-001","inv-002"],
    media: [],
    content: `## Overview
When it is time for a physical inventory count, you may want to print a count sheet to write counts on by hand instead of scanning. **Do not start an audit** just to get a count sheet — this creates unnecessary audit records for the month. Instead, export the inventory list from the Inventory Center as an Excel file.

## When to Use
- You want to print a count sheet for a physical inventory count.
- You prefer writing counts on paper instead of scanning items.
- You need a list of your merchandise for any counting purpose.

## Step-by-Step

**Step 1: Open the Inventory Center**
From the left sidebar menu, click **Inventory Center**.

![Click Inventory Center in the left sidebar menu](screenshots/inv-003-step01.png)

**Step 2: Sort by Merchandise**
On the **Add / Manage Items** tab, use the first dropdown (Department) and select **Merchandise**. This is important — if you don't filter by Merchandise, the list will include greens fees, food and beverage items, and other non-merchandise categories that you don't need on your count sheet.

![Filter the Inventory Center by Merchandise in the Department dropdown](screenshots/inv-003-step02.png)

**Step 3: Export to Excel**
Click the **Excel icon** on the bottom-right corner of the screen (next to "Knowledge Base"). The file will take approximately 30 seconds to download. It will open as an "Inventory Management" spreadsheet with columns for Department, SubDepartment, Category, InventoryType, Item, SKU, Vendor, Stock, ItemCost, SalePrice, and Discount.

![The exported Excel file showing the Inventory Management spreadsheet](screenshots/inv-003-step03.png)

**Step 4: Add a Count Column**
In the Excel file, scroll to the right and add a **Count** column after the last column. This is where you will write in your physical counts by hand.

![Excel spreadsheet with a Count column added on the right side](screenshots/inv-003-step04.png)

**Step 5: Sort the Spreadsheet (Optional)**
You can sort the spreadsheet to organize items however you prefer — for example, by **SubDepartment** to group similar items together (Golf Balls, Men's Apparel, Women's Apparel, etc.). Use Excel's **Sort** feature under the Data tab.

![Use the Sort dialog to organize items by SubDepartment or Category](screenshots/inv-003-step05.png)

**Step 6: Print and Count**
Print the spreadsheet. Use it to walk the shop floor and record your counts by hand. When you are ready to enter the counts into the system, **then** go into the audit module.

![Final sorted spreadsheet ready to print with Count column](screenshots/inv-003-step06.png)

## Important Reminders
- **Do NOT start an audit just to get a count sheet.** This creates multiple audits for a single month, which causes confusion.
- Only go into the audit module when you are **ready to enter your counts**.
- If you prefer scanning over paper, you do not need this procedure — go directly to the audit module when ready.
`,
  },

];
