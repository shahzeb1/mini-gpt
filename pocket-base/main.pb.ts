/**
 * The following is code to extend pocket base
 * This code adds a new /api/count route that
 * returns the total number of prompts in the doc
 *
 * Docs: https://pocketbase.io/docs/js-overview
 */
$app.onBeforeServe().add((e) => {
  e.router.get(
    "/api/count",
    (c) => {
      const result = new DynamicModel({ count: "" });

      $app
        .dao()
        .db()
        .newQuery("SELECT COUNT(id) as count FROM prompts")
        .one(result);

      return c.json(200, result);
    },
    // middlewares
    $apis.activityLogger($app)
  );
});
