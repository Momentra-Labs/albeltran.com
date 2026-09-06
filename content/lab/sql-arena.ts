import type { LabDifficulty, LabEducationBlock } from "./types";

export type SqlRow = Record<string, string | number | null>;

export type SqlChallenge = {
  id: string;
  title: string;
  difficulty: LabDifficulty;
  prompt: string;
  accepted: string[];
  expected: SqlRow[];
  hint: string;
  explanation: string;
};

export const SQL_TABLES: Record<string, SqlRow[]> = {
  customers: [
    { id: 1, name: "Ana Cruz", email: "ana@example.com", city: "Manila" },
    { id: 2, name: "Ben Reyes", email: "ben@example.com", city: "Cebu" },
    { id: 3, name: "Cara Lim", email: "cara@example.com", city: "Manila" },
    { id: 4, name: "Diego Uy", email: "diego@example.com", city: "Davao" },
  ],
  products: [
    { id: 10, name: "Notebook", price: 20, stock: 12 },
    { id: 11, name: "Keyboard", price: 80, stock: 3 },
    { id: 12, name: "Mouse", price: 25, stock: 0 },
    { id: 13, name: "Monitor", price: 180, stock: 5 },
  ],
  orders: [
    { id: 100, customer_id: 1, product_id: 10, qty: 2, status: "paid", total: 40 },
    { id: 101, customer_id: 1, product_id: 11, qty: 1, status: "paid", total: 80 },
    { id: 102, customer_id: 2, product_id: 13, qty: 1, status: "unpaid", total: 180 },
    { id: 103, customer_id: 3, product_id: 10, qty: 3, status: "paid", total: 60 },
    { id: 104, customer_id: 3, product_id: 12, qty: 1, status: "cancelled", total: 25 },
    { id: 105, customer_id: 4, product_id: 11, qty: 2, status: "unpaid", total: 160 },
  ],
};

export const SQL_CHALLENGES: readonly SqlChallenge[] = [
  {
    id: "manila-customers",
    title: "Manila customers",
    difficulty: "junior",
    prompt: "Return name and email for customers in Manila, ordered by name.",
    accepted: [
      "select name, email from customers where city = 'manila' order by name",
      "select name, email from customers where city='manila' order by name asc",
    ],
    expected: [
      { name: "Ana Cruz", email: "ana@example.com" },
      { name: "Cara Lim", email: "cara@example.com" },
    ],
    hint: "Filter city, project two columns, order by name.",
    explanation: "A single-table filter plus a stable order. Quote the city; case is folded in this arena.",
  },
  {
    id: "in-stock",
    title: "In-stock products",
    difficulty: "junior",
    prompt: "List product name and price where stock is greater than 0, cheapest first.",
    accepted: [
      "select name, price from products where stock > 0 order by price",
      "select name, price from products where stock > 0 order by price asc",
    ],
    expected: [
      { name: "Notebook", price: 20 },
      { name: "Keyboard", price: 80 },
      { name: "Monitor", price: 180 },
    ],
    hint: "Mouse is at 0 stock.",
    explanation: "Exclude the empty SKU and sort on price, not name.",
  },
  {
    id: "unpaid-orders",
    title: "Unpaid orders with email",
    difficulty: "mid",
    prompt: "Return order id, total, and customer email for unpaid orders.",
    accepted: [
      "select orders.id, orders.total, customers.email from orders join customers on customers.id = orders.customer_id where orders.status = 'unpaid'",
      "select o.id, o.total, c.email from orders o join customers c on c.id = o.customer_id where o.status = 'unpaid'",
    ],
    expected: [
      { id: 102, total: 180, email: "ben@example.com" },
      { id: 105, total: 160, email: "diego@example.com" },
    ],
    hint: "Join orders to customers on customer_id.",
    explanation: "This is a filter after an inner join. Cancelled and paid rows stay out.",
  },
  {
    id: "top-customers",
    title: "Top customers by paid total",
    difficulty: "mid",
    prompt: "For paid orders only, return customer name and sum(total) as spent, highest first.",
    accepted: [
      "select customers.name, sum(orders.total) as spent from orders join customers on customers.id = orders.customer_id where orders.status = 'paid' group by customers.name order by spent desc",
      "select c.name, sum(o.total) as spent from orders o join customers c on c.id = o.customer_id where o.status = 'paid' group by c.name order by spent desc",
    ],
    expected: [
      { name: "Ana Cruz", spent: 120 },
      { name: "Cara Lim", spent: 60 },
    ],
    hint: "GROUP BY the customer, SUM paid totals.",
    explanation: "Ana has 40+80. Cara's cancelled mouse does not count.",
  },
  {
    id: "never-ordered",
    title: "Customers with no paid order",
    difficulty: "mid",
    prompt: "Return customer names who have no paid orders.",
    accepted: [
      "select name from customers where id not in (select customer_id from orders where status = 'paid')",
      "select c.name from customers c left join orders o on o.customer_id = c.id and o.status = 'paid' where o.id is null",
    ],
    expected: [
      { name: "Ben Reyes" },
      { name: "Diego Uy" },
    ],
    hint: "NOT IN a paid subquery, or LEFT JOIN paid orders and filter NULL.",
    explanation: "Ben and Diego only have unpaid rows.",
  },
  {
    id: "low-stock-paid",
    title: "Paid items that are low stock",
    difficulty: "mid",
    prompt: "Return distinct product names that appear on a paid order and have stock < 5.",
    accepted: [
      "select distinct products.name from orders join products on products.id = orders.product_id where orders.status = 'paid' and products.stock < 5",
    ],
    expected: [{ name: "Keyboard" }],
    hint: "Join orders to products; stock lives on products.",
    explanation: "Notebook is paid but stock is 12. Keyboard is paid and stock is 3.",
  },
  {
    id: "order-count",
    title: "Orders per city",
    difficulty: "mid",
    prompt: "Return city and count of orders as orders, highest count first.",
    accepted: [
      "select customers.city, count(orders.id) as orders from orders join customers on customers.id = orders.customer_id group by customers.city order by orders desc",
      "select c.city, count(o.id) as orders from orders o join customers c on c.id = o.customer_id group by c.city order by orders desc",
    ],
    expected: [
      { city: "Manila", orders: 4 },
      { city: "Cebu", orders: 1 },
      { city: "Davao", orders: 1 },
    ],
    hint: "Join, group by city, count order rows.",
    explanation: "Ana and Cara are both Manila (4 orders together).",
  },
  {
    id: "average-paid",
    title: "Average paid order",
    difficulty: "junior",
    prompt: "Return a single row with avg_paid as the average total of paid orders.",
    accepted: [
      "select avg(total) as avg_paid from orders where status = 'paid'",
    ],
    expected: [{ avg_paid: 60 }],
    hint: "AVG(total) WHERE status = paid. (40+80+60)/3 = 60.",
    explanation: "Three paid orders. This arena uses integer averages when the math is exact.",
  },
  {
    id: "expensive-unpaid",
    title: "Unpaid over 150",
    difficulty: "junior",
    prompt: "Return order id and total for unpaid orders with total > 150.",
    accepted: [
      "select id, total from orders where status = 'unpaid' and total > 150",
    ],
    expected: [
      { id: 102, total: 180 },
      { id: 105, total: 160 },
    ],
    hint: "Two predicates on orders.",
    explanation: "Both unpaid rows happen to be over 150 in this dataset.",
  },
  {
    id: "product-revenue",
    title: "Paid revenue by product",
    difficulty: "senior",
    prompt: "Return product name and sum of paid totals as revenue, only products with paid revenue, highest first.",
    accepted: [
      "select products.name, sum(orders.total) as revenue from orders join products on products.id = orders.product_id where orders.status = 'paid' group by products.name order by revenue desc",
      "select p.name, sum(o.total) as revenue from orders o join products p on p.id = o.product_id where o.status = 'paid' group by p.name order by revenue desc",
    ],
    expected: [
      { name: "Notebook", revenue: 100 },
      { name: "Keyboard", revenue: 80 },
    ],
    hint: "Paid only, group by product name.",
    explanation: "Notebook 40+60, Keyboard 80. Monitor is unpaid. Mouse is cancelled.",
  },
];

export function getSqlChallenge(id: string) {
  return SQL_CHALLENGES.find((item) => item.id === id);
}

export const SQL_EDUCATION: LabEducationBlock = {
  howItWorks: [
    "The tables on the page are the whole database. Type a SQL-style statement.",
    "The evaluator normalizes whitespace and case, then matches accepted statements for that challenge. It is not a full SQL engine.",
  ],
  keyConcepts: [
    {
      title: "Filter before you join in your head",
      body: "Know which table owns the column. Status lives on orders; city lives on customers.",
    },
    {
      title: "Paid is a predicate",
      body: "Most revenue questions die if cancelled and unpaid rows leak in.",
    },
  ],
  commonMistakes: [
    "Selecting * and hoping the arena will project for you.",
    "Grouping without an aggregate, or aggregating without a group.",
  ],
  interviewTips: [
    "Read the expected shape: column names matter here.",
    "Say the join key out loud before you type it.",
  ],
};
