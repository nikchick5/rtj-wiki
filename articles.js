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

];
