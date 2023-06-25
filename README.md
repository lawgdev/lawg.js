# lawg.js

### Initialization
```ts
const lawg = new Lawg({
  token: process.env.LAWG_TOKEN,
  project: "my_cool_project",
  ua: req.headers["user-agent"], // Optional
});
```

## Logs

### Creating a Log
```ts
await lawg.feed("orders-shipped").log({
  title: "Order Shipped",
  description: "John's order has been shipped! (Order #10403)",
  emoji: "🚚" // or :truck:
  tags: {
    "customer-id": 1234,
    "customer-email": "johnny@lawg.dev"
  } // Optional
  notify: true, // Optional (default false)
});
```

### Editing a Log
// TODO

### Deleting a Log
// TODO

## Insights

### Creating a Insight
```ts
await lawg.insight({
  title: "Users Joined",
  value: 250,
});
```

### Updating a Insight
// TODO
