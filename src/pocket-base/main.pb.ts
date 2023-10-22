$app.onBeforeServe().add((e) => {
  e.router.get(
    "/api/count",
    (c) => {
      const d = new DynamicModel({ count: "" });
      const result = arrayOf(d);

      $app
        .dao()
        .db()
        .newQuery("SELECT COUNT(id) as count FROM prompts")
        .all(result);

      return c.json(200, result);
    },
    // middlewares
    $apis.activityLogger($app)
  );
});
