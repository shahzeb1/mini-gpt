const corsHeaders = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Origin": "*", // Change this to your URL
};

export async function handleRequest(request, env, cb) {
  if (request.method === "OPTIONS") {
    return new Response("OK", {
      headers: corsHeaders,
    });
  } else if (request.method === "POST") {
    const res = await cb(request, env);
    return new Response(JSON.stringify(res), {
      headers: {
        "Content-type": "application/json",
        ...corsHeaders,
      },
    });
  } else {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }
}
