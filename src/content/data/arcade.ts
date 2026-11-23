import { ArcadeChallenge } from "@/types/arcade";

export const arcadeChallenges: ArcadeChallenge[] = [
  // =========================================================================
  // LEVEL 01: JAVASCRIPT FUNDAMENTALS
  // =========================================================================
  {
    id: "js-01",
    level: 1,
    levelTitle: "Level 1: JavaScript Fundamentals",
    category: "JavaScript",
    title: "Closure & Asynchronous Execution in Loops",
    scenario: "A junior engineer expects this telemetry loop to log indices 0, 1, 2 sequentially after 100ms each, but instead it prints '3, 3, 3'. Identify the fix.",
    language: "javascript",
    buggyCode: `function logBatchTelemetry() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function() {
      console.log("Ingesting packet:", i);
    }, 100);
  }
}`,
    options: [
      {
        id: "opt-1",
        text: "Change 'var i = 0' to block-scoped 'let i = 0'.",
        fixCode: `for (let i = 0; i < 3; i++)`,
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Change setTimeout delay to (i * 100) without altering var declaration.",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Convert setTimeout callback to an arrow function without changing var.",
        isCorrect: false,
      },
      {
        id: "opt-4",
        text: "Replace console.log with process.stdout.write.",
        isCorrect: false,
      },
    ],
    hint: "Notice how 'var' hoists to function scope, sharing a single reference across all asynchronous event-loop macrotasks.",
    explanation: "Because 'var' is function-scoped rather than block-scoped, all three setTimeout callbacks close over the exact same variable reference 'i'. By the time the event loop executes the timer callbacks after 100ms, the for-loop has already completed and 'i' evaluates to 3. Replacing 'var' with 'let' creates a fresh lexical binding for each loop iteration.",
  },
  {
    id: "js-02",
    level: 1,
    levelTitle: "Level 1: JavaScript Fundamentals",
    category: "JavaScript",
    title: "Object Mutation & Immutable State",
    scenario: "A function modifies a user's permissions, but unexpectedly mutates the base template object across the whole application.",
    language: "javascript",
    buggyCode: `const DEFAULT_CONFIG = { retries: 3, timeout: 5000, auth: { role: "guest" } };

function createSessionConfig(overrides) {
  const config = Object.assign({}, DEFAULT_CONFIG);
  config.auth.role = overrides.role; // Bug here!
  return config;
}`,
    options: [
      {
        id: "opt-1",
        text: "Use Object.assign({}, DEFAULT_CONFIG, overrides) directly.",
        isCorrect: false,
      },
      {
        id: "opt-2",
        text: "Perform a deep clone or clone nested objects: auth: { ...DEFAULT_CONFIG.auth, ...overrides.auth }.",
        fixCode: `const config = { ...DEFAULT_CONFIG, auth: { ...DEFAULT_CONFIG.auth, role: overrides.role } };`,
        isCorrect: true,
      },
      {
        id: "opt-3",
        text: "Freeze the overrides object with Object.freeze(overrides).",
        isCorrect: false,
      },
      {
        id: "opt-4",
        text: "Define auth with Object.defineProperty.",
        isCorrect: false,
      },
    ],
    hint: "Object.assign and spread operator only perform shallow copies. Nested references still point to the original object.",
    explanation: "Object.assign({}, DEFAULT_CONFIG) performs a shallow copy. The nested 'auth' object reference remains identical between the copy and DEFAULT_CONFIG. Modifying 'config.auth.role' inadvertently mutates the shared DEFAULT_CONFIG object. Creating a deep copy or explicitly spreading nested objects prevents cross-session pollution.",
  },

  // =========================================================================
  // LEVEL 02: REACT & COMPONENT LOGIC
  // =========================================================================
  {
    id: "react-01",
    level: 2,
    levelTitle: "Level 2: React & Component Logic",
    category: "React",
    title: "Stale Closure in useEffect Timer Hook",
    scenario: "A live vehicle speed counter in a fleet dashboard increments to 1 and then gets stuck forever at 1. Why?",
    language: "tsx",
    buggyCode: `function SpeedTelemetry() {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Stale state closure!
      setSpeed(speed + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array

  return <div>Current Speed: {speed} km/h</div>;
}`,
    options: [
      {
        id: "opt-1",
        text: "Use the functional state updater form: setSpeed((prev) => prev + 1).",
        fixCode: `setSpeed((prev) => prev + 1);`,
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Remove the return cleanup function clearInterval.",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Change useState to useRef and re-render manually.",
        isCorrect: false,
      },
      {
        id: "opt-4",
        text: "Wrap the component in React.memo.",
        isCorrect: false,
      },
    ],
    hint: "Because the effect dependency array is empty, the setInterval callback closes over the initial render's value of 'speed' (which is 0).",
    explanation: "The setInterval callback captured 'speed' when the component initially mounted where speed was 0. Every second, it evaluates setSpeed(0 + 1) = 1. Using the functional updater form `setSpeed((prev) => prev + 1)` receives the freshest state value from React's internal fiber queue without needing to recreate the interval on every tick.",
  },
  {
    id: "react-02",
    level: 2,
    levelTitle: "Level 2: React & Component Logic",
    category: "React",
    title: "Reconciliation Corruption via Unstable Keys",
    scenario: "A re-orderable list of enterprise supplier invoices loses user input and flickers during filtering. What is the root cause?",
    language: "tsx",
    buggyCode: `function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  return (
    <ul>
      {invoices.map((inv, index) => (
        <InvoiceRow key={index} data={inv} />
      ))}
    </ul>
  );
}`,
    options: [
      {
        id: "opt-1",
        text: "Replace array index with a stable unique identifier: key={inv.id}.",
        fixCode: `<InvoiceRow key={inv.id} data={inv} />`,
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Generate a random key on each render: key={Math.random()}.",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Wrap InvoiceRow in a React Fragment.",
        isCorrect: false,
      },
      {
        id: "opt-4",
        text: "Pass key as a regular prop named rowKey.",
        isCorrect: false,
      },
    ],
    hint: "When array indices are used as keys, reordering or filtering items shifts the indices, tricking React's diffing algorithm into preserving stale component state.",
    explanation: "React relies on keys to track elements between renders. Using array indices breaks down whenever items are filtered, deleted, or sorted, because the item at index 0 changes identities, causing React to mismatch DOM state. Using stable, unique entity identifiers (e.g. `inv.id`) ensures accurate reconciliation.",
  },

  // =========================================================================
  // LEVEL 03: NODE.JS & API DEBUGGING
  // =========================================================================
  {
    id: "node-01",
    level: 3,
    levelTitle: "Level 3: Node.js & API Debugging",
    category: "Node.js",
    title: "Unhandled Asynchronous Exception Crashing Process",
    scenario: "An Express route handler crashes the entire Node.js server with 'UnhandledPromiseRejection' when database queries fail.",
    language: "typescript",
    buggyCode: `app.get("/api/v1/invoices/:id", async (req, res) => {
  const invoice = await db.invoices.findById(req.params.id);
  if (!invoice) {
    res.status(404).json({ error: "Invoice not found" });
  }
  res.json(invoice);
});`,
    options: [
      {
        id: "opt-1",
        text: "Add a try/catch block and ensure execution halts with a return statement on 404.",
        fixCode: `try {
  const invoice = await db.invoices.findById(req.params.id);
  if (!invoice) {
    return res.status(404).json({ error: "Invoice not found" });
  }
  return res.json(invoice);
} catch (err) {
  return res.status(500).json({ error: "Internal Database Error" });
}`,
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Remove the async keyword from the route callback.",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Change res.json(invoice) to res.send(JSON.stringify(invoice)).",
        isCorrect: false,
      },
      {
        id: "opt-4",
        text: "Call res.end() immediately after res.json().",
        isCorrect: false,
      },
    ],
    hint: "Notice two bugs: uncaught database promise rejections AND missing 'return' after res.status(404), which causes 'ERR_HTTP_HEADERS_SENT'.",
    explanation: "Two severe issues occur: first, if the database throws, the rejection is uncaught and crashes Node.js unless wrapped in try/catch (or express async handler). Second, without `return res.status(404)...`, execution falls through to `res.json(invoice)`, attempting to write HTTP headers twice ('Cannot set headers after they are sent to the client').",
  },
  {
    id: "node-02",
    level: 3,
    levelTitle: "Level 3: Node.js & API Debugging",
    category: "Node.js",
    title: "Event Loop Starvation in Synchronous CPU Hashing",
    scenario: "Incoming WebSocket telemetry pings suffer massive 2000ms latency spikes whenever users sign in. Inspect the auth middleware.",
    language: "typescript",
    buggyCode: `import crypto from "crypto";

export function verifyUserPassword(password: string, hash: string, salt: string) {
  // Synchronous PBKDF2 blocks Node.js main thread!
  const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512");
  return derivedKey.toString("hex") === hash;
}`,
    options: [
      {
        id: "opt-1",
        text: "Switch to asynchronous crypto.pbkdf2 (or promisify) to offload hashing to libuv worker threads.",
        fixCode: `const derivedKey = await util.promisify(crypto.pbkdf2)(password, salt, 100000, 64, "sha512");`,
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Reduce PBKDF2 iterations to 10 to speed it up.",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Run pbkdf2Sync inside setImmediate.",
        isCorrect: false,
      },
      {
        id: "opt-4",
        text: "Replace SHA-512 with MD5.",
        isCorrect: false,
      },
    ],
    hint: "Synchronous crypto methods execute on the single V8 main thread, blocking the event loop from servicing network sockets.",
    explanation: "Synchronous crypto calls (`pbkdf2Sync`) occupy Node's single-threaded event loop for tens or hundreds of milliseconds per invocation, halting all concurrent WebSocket connections and HTTP requests. Using the asynchronous `crypto.pbkdf2` delegates the computation to the libuv background thread pool (`UV_THREADPOOL_SIZE`), leaving the event loop free to ingest real-time traffic.",
  },

  // =========================================================================
  // LEVEL 04: SQL & DATABASE CHALLENGES
  // =========================================================================
  {
    id: "sql-01",
    level: 4,
    levelTitle: "Level 4: SQL & Relational Database Engineering",
    category: "SQL",
    title: "The N+1 Query Disaster in Relational Feeds",
    scenario: "Loading 100 students on the Veda Scholars dashboard issues 101 separate database roundtrips, overloading PostgreSQL.",
    language: "sql",
    buggyCode: `-- Step 1: Fetches 100 students
SELECT id, full_name, email FROM students WHERE institution_id = $1;

-- Step 2: Loop runs this 100 times in application code!
SELECT grade, subject FROM academic_records WHERE student_id = ?;`,
    options: [
      {
        id: "opt-1",
        text: "Eager-load records in a single roundtrip via JOIN or aggregated JSON query.",
        fixCode: `SELECT s.id, s.full_name, s.email, json_agg(r.*) AS records
FROM students s
LEFT JOIN academic_records r ON r.student_id = s.id
WHERE s.institution_id = $1
GROUP BY s.id;`,
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Add an INDEX on students(email).",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Increase PostgreSQL max_connections in postgresql.conf to 1000.",
        isCorrect: false,
      },
      {
        id: "opt-4",
        text: "Run the 100 queries inside a BEGIN / COMMIT block.",
        isCorrect: false,
      },
    ],
    hint: "Notice how querying nested records inside a parent iteration scales linearly with N. Joining or aggregating reduces I/O to a single O(1) query.",
    explanation: "The infamous N+1 query problem saturates network bandwidth and exhausts connection pools because application code iterates through the first result and executes a query for each row. Consolidating the retrieval into a single query using `LEFT JOIN` and PostgreSQL's `json_agg` reduces network latency to a single roundtrip.",
  },
  {
    id: "sql-02",
    level: 4,
    levelTitle: "Level 4: SQL & Relational Database Engineering",
    category: "SQL",
    title: "Transactional Isolation & Lost Financial Updates",
    scenario: "Two concurrent bill-booking accountants approve an invoice adjustment simultaneously, causing one adjustment to overwrite the other. Fix it with proper locking.",
    language: "sql",
    buggyCode: `BEGIN;
-- Select without locking:
SELECT balance FROM vendor_ledgers WHERE vendor_id = 42;

-- Application calculates newBalance = balance - 1500.00
UPDATE vendor_ledgers SET balance = $1 WHERE vendor_id = 42;
COMMIT;`,
    options: [
      {
        id: "opt-1",
        text: "Acquire an exclusive row-level lock using SELECT ... FOR UPDATE or perform an atomic decrement.",
        fixCode: `UPDATE vendor_ledgers SET balance = balance - 1500.00 WHERE vendor_id = 42;`,
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Change database isolation level to READ UNCOMMITTED.",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Drop foreign keys on vendor_ledgers to eliminate locking contention.",
        isCorrect: false,
      },
      {
        id: "opt-4",
        text: "Add a composite primary key (vendor_id, balance).",
        isCorrect: false,
      },
    ],
    hint: "Standard SELECT reads snapshot data without locking rows. Concurrent updates overwrite each other unless an atomic update or row lock is enforced.",
    explanation: "This classic race condition ('lost update anomaly') occurs when transaction A and B read balance = 10,000 concurrently, compute their local values, and overwrite each other's changes. Performing an atomic in-place update `SET balance = balance - 1500.00` or locking the row with `SELECT ... FOR UPDATE` serializes the transaction safely.",
  },

  // =========================================================================
  // LEVEL 05: ADVANCED ENGINEERING PROBLEMS
  // =========================================================================
  {
    id: "sys-01",
    level: 5,
    levelTitle: "Level 5: Advanced Systems & Concurrency",
    category: "Advanced Systems",
    title: "Go Goroutine Leak on Unbuffered Channel",
    scenario: "A high-throughput Go microservice ingesting Hosur fleet telemetry runs out of RAM after 48 hours. Profiling shows 300,000 active goroutines. Spot the leak.",
    language: "go",
    buggyCode: `func FetchTelemetryWithTimeout(ctx context.Context, vehicleID string) (*Telemetry, error) {
    ch := make(chan *Telemetry) // Unbuffered!

    go func() {
        data := queryVehicleTelemetry(vehicleID)
        ch <- data // Blocks forever if context times out before this send!
    }()

    select {
    case res := <-ch:
        return res, nil
    case <-ctx.Done():
        return nil, ctx.Err()
    }
}`,
    options: [
      {
        id: "opt-1",
        text: "Make the channel buffered with capacity 1: make(chan *Telemetry, 1).",
        fixCode: `ch := make(chan *Telemetry, 1)`,
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Call runtime.GC() in a defer statement.",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Wrap the select statement in an infinite loop.",
        isCorrect: false,
      },
      {
        id: "opt-4",
        text: "Remove context.Context from the function signature.",
        isCorrect: false,
      },
    ],
    hint: "On an unbuffered channel, sending blocks until a receiver is ready. If the timeout triggers first, no receiver ever arrives.",
    explanation: "When `ctx.Done()` fires first, the parent function exits and drops `ch`. Because the channel is unbuffered, the background goroutine attempting `ch <- data` blocks permanently waiting for a reader that will never arrive. The goroutine cannot be garbage collected, leaking memory. Providing a buffer of 1 (`make(chan *Telemetry, 1)`) allows the goroutine to complete its write and terminate cleanly.",
  },
  {
    id: "sys-02",
    level: 5,
    levelTitle: "Level 5: Advanced Systems & Concurrency",
    category: "Advanced Systems",
    title: "Jordan Curve Theorem Ray-Casting Boundary Edge Case",
    scenario: "In Mohan's geofencing engine, vehicles traveling directly through horizontal polygon vertices register false exit/entry flip-flops. Why?",
    language: "typescript",
    buggyCode: `export function isInsideGeofence(p: Point, poly: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    // Ray-cast horizontal intersection test:
    if ((poly[i].y > p.y) !== (poly[j].y > p.y)) {
      const intersectX =
        poly[i].x + ((p.y - poly[i].y) * (poly[j].x - poly[i].x)) / (poly[j].y - poly[i].y);
      if (p.x < intersectX) {
        inside = !inside;
      }
    }
  }
  return inside;
}`,
    options: [
      {
        id: "opt-1",
        text: "The half-open vertical interval (poly[i].y > p.y) !== (poly[j].y > p.y) correctly handles vertex singularity, but collinear horizontal segments (dy === 0) need explicit division-by-zero guards and strict boundary inclusivity.",
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Ray casting cannot work on non-convex polygons; you must triangulate first.",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Invert inside = true at the start of the function.",
        isCorrect: false,
      },
      {
        id: "opt-4",
        text: "Replace division with multiplication by a constant factor.",
        isCorrect: false,
      },
    ],
    hint: "When a test ray passes directly through a vertex shared by two edges, counting both edge endpoints toggles parity twice instead of once unless strict interval rules are enforced.",
    explanation: "The Jordan Curve Ray-Casting algorithm determines point containment by counting horizontal ray crossings to infinity. An odd count means inside; an even count means outside. Special handling is required when a ray grazes an exact vertex or horizontal edge: using a half-open interval ensures a vertex shared between two edges is counted exactly once.",
  },
];
