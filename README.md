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

### Fetching all Feed Logs

```ts
await lawg.feed("orders-shipped").fetchLogs();
```

### Creating a Log

```ts
await lawg.feed("orders-shipped").log({
  title: "Order Shipped",
  description: "John's order has been shipped! (Order #10403)",
  emoji: "🚚", // or :truck:
  metadata: {
    ua: req.headers["user-agent"], // Optional (overides UA set in initialization)
    tags: {
      "customer-id": 1234,
      "customer-email": "johnny@lawg.dev",
    }, // Optional
  },
  notify: true, // Optional (defaults to false)
});
```

### Updating a Log

```ts
await lawg.feed("orders-shipped").editLog({
  id: "log_xxxxxxxxxxxxxx",
  title: "Order Returned",
  description:
    "John's order has been returned, it will no longer ship! (Order #10403)",
  emoji: "🚚", // or :truck: (Optional)
  metadata: {
    tags: {
      "customer-id": 1234,
      "customer-email": "johnathan@lawg.dev",
    }, // Optional
  },
  timestamp: "2023-06-22T13:42:55.789Z", // Optional
});
```

### Deleting a Log

```ts
await lawg.feed("orders-shipped").deleteLog({
  id: "log_xxxxxxxxxxxxxx",
});
```

## Insights

### Creating a Insight

```ts
await lawg.insight({
  title: "Users Joined",
  emoji: "👤" // or :bust_in_silhouette: (Optional)
  value: 250,
});
```

### Updating a Insight

You may set `emoji: ":your_emoji:"` in any of the fields below when updating an insight (optional).

#### Setting a Insight's Value

```ts
await lawg.setInsight({
  id: "insight_xxxxxxxxxxxxxx",
  set: 150, // Overides initial value (Now: 150, Before: 250)
});
```

#### Incrementing a Insight

##### Positive Increments

```ts
await lawg.incInsight({
  id: "insight_xxxxxxxxxxxxxx",
  increment: 150, // Increments initial value (Now: 400, Before: 250)
});
```

##### Negative Increments

```ts
await lawg.incInsight({
  id: "insight_xxxxxxxxxxxxxx",
  increment: -150, // Increments initial value (Now: 0, Before: 250)
});
```
