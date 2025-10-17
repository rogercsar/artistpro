exports.handler = async (event, context) => {
  console.log("[hello] invoked", {
    method: event.httpMethod,
    path: event.path,
    query: event.queryStringParameters,
  });

  try {
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ok: true,
        message: "Hello from Netlify Functions",
        time: new Date().toISOString(),
      }),
    };
  } catch (err) {
    console.error("[hello] error", err);
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Internal Server Error" }),
    };
  }
};