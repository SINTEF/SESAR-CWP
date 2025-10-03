/**
 * Closest points between 2D polylines / multilines (no deps).
 *
 * NOTE (geo): This is Euclidean 2D. If your inputs are lat/lon degrees,
 * it's fine for small areas. For large distances, project to a local metric CRS first.
 */

//////////////////// Types ////////////////////

export type Point = { x: number; y: number };

export type Polyline = Point[];           // at least 2 points recommended
export type MultiLine = Polyline[];       // collection of polylines

export interface ClosestResult {
  distance: number;        // Euclidean distance
  a: Point;                // closest point on A
  b: Point;                // closest point on B
  // Optional extra metadata (useful for snapping, etc.)
  segA?: number;           // segment index in polyline A
  segB?: number;           // segment index in polyline B
  tA?: number;             // param in [0,1] along segment segA
  tB?: number;             // param in [0,1] along segment segB
  lineA?: number;          // which polyline inside MultiLine A
  lineB?: number;          // which polyline inside MultiLine B
}

const EPS = 1e-12;

//////////////////// Vector helpers ////////////////////

function sub(a: Point, b: Point): Point { return { x: a.x - b.x, y: a.y - b.y }; }
function add(a: Point, b: Point): Point { return { x: a.x + b.x, y: a.y + b.y }; }
function mul(a: Point, s: number): Point { return { x: a.x * s, y: a.y * s }; }
function dot(a: Point, b: Point): number { return a.x * b.x + a.y * b.y; }
function norm2(a: Point): number { return dot(a, a); }
function dist2(a: Point, b: Point): number { return norm2(sub(a, b)); }
function clamp01(t: number): number { return t < 0 ? 0 : (t > 1 ? 1 : t); }

//////////////////// Segment primitives ////////////////////

/**
 * Proper orientation test with tolerance.
 */
function orient(a: Point, b: Point, c: Point): number {
  // cross((b-a), (c-a))
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function onSegment(a: Point, b: Point, p: Point): boolean {
  // p collinear and within bounding box (with tolerance)
  return Math.abs(orient(a, b, p)) <= EPS &&
         Math.min(a.x, b.x) - EPS <= p.x && p.x <= Math.max(a.x, b.x) + EPS &&
         Math.min(a.y, b.y) - EPS <= p.y && p.y <= Math.max(a.y, b.y) + EPS;
}

/**
 * Segment–segment intersection (inclusive of endpoints).
 * Returns an intersection point if they intersect (we choose one point).
 */
function segmentIntersection(p0: Point, p1: Point, q0: Point, q1: Point): Point | null {
  const o1 = orient(p0, p1, q0);
  const o2 = orient(p0, p1, q1);
  const o3 = orient(q0, q1, p0);
  const o4 = orient(q0, q1, p1);

  const s1 = Math.sign(o1);
  const s2 = Math.sign(o2);
  const s3 = Math.sign(o3);
  const s4 = Math.sign(o4);

  // Proper intersection
  if (s1 * s2 < 0 && s3 * s4 < 0) {
    // Compute intersection point on lines; since we just need one representative,
    // we'll use line param formula.
    const r = sub(p1, p0);
    const s = sub(q1, q0);
    const rxs = r.x * s.y - r.y * s.x;
    if (Math.abs(rxs) <= EPS) { return null; // parallel-ish (should have been handled above by signs)
}
    const t = ((q0.x - p0.x) * s.y - (q0.y - p0.y) * s.x) / rxs;
    return add(p0, mul(r, t));
  }

  // Collinear or touching endpoints cases
  if (Math.abs(o1) <= EPS && onSegment(p0, p1, q0)) { return q0; }
  if (Math.abs(o2) <= EPS && onSegment(p0, p1, q1)) { return q1; }
  if (Math.abs(o3) <= EPS && onSegment(q0, q1, p0)) { return p0; }
  if (Math.abs(o4) <= EPS && onSegment(q0, q1, p1)) { return p1; }

  return null;
}

/**
 * Closest points between two segments in 2D.
 * Robust to near-parallel and degenerate segments.
 * Returns points on each segment, distance^2, and the segment params (t in [0,1]).
 */
function closestPointsOnSegments(
  p0: Point, p1: Point, q0: Point, q1: Point
): { a: Point; b: Point; tA: number; tB: number; d2: number } {
  // Handle degeneracy: convert any point-segment or point-point cases
  const u = sub(p1, p0);
  const v = sub(q1, q0);
  const w0 = sub(p0, q0);

  const a = dot(u, u); // |u|^2
  const b = dot(u, v);
  const c = dot(v, v); // |v|^2
  const d = dot(u, w0);
  const e = dot(v, w0);
  const D = a * c - b * b;

  let sN = D;
  let tN = D;
  let sD = D;
  let tD = D;

  // Degenerate cases: if a==0, segment P is a point
  if (a <= EPS && c <= EPS) {
    // both segments are points
    const aPt = p0;
    const bPt = q0;
    return { a: aPt, b: bPt, tA: 0, tB: 0, d2: dist2(aPt, bPt) };
  }
  if (a <= EPS) {
    // P is a point; project P onto Q
    const t = clamp01(e / c);
    const bPt = add(q0, mul(v, t));
    return { a: p0, b: bPt, tA: 0, tB: t, d2: dist2(p0, bPt) };
  }
  if (c <= EPS) {
    // Q is a point; project Q onto P
    const s = clamp01(-d / a);
    const aPt = add(p0, mul(u, s));
    return { a: aPt, b: q0, tA: s, tB: 0, d2: dist2(aPt, q0) };
  }

  // General case
  if (D > EPS) {
    sN = (b * e - c * d);
    tN = (a * e - b * d);

    // Clamp s to [0,1], then recompute t
    if (sN < 0) { sN = 0; tN = e; tD = c; }
    else if (sN > sD) { sN = sD; tN = e + b; tD = c; }
  } else {
    // Lines are almost parallel; choose s = 0 and project onto Q
    sN = 0;
    tN = e;
    tD = c;
  }

  // Clamp t to [0,1], then recompute s if needed
  if (tN < 0) {
    tN = 0;
    if (-d < 0) { sN = 0; }
    else if (-d > a) { sN = sD; }
    else { sN = -d; sD = a; }
  } else if (tN > tD) {
    tN = tD;
    if (-d + b < 0) { sN = 0; }
    else if (-d + b > a) { sN = sD; }
    else { sN = -d + b; sD = a; }
  }

  const s = Math.abs(sD) <= EPS ? 0 : sN / sD;
  const t = Math.abs(tD) <= EPS ? 0 : tN / tD;

  const aPt = add(p0, mul(u, s));
  const bPt = add(q0, mul(v, t));
  return { a: aPt, b: bPt, tA: s, tB: t, d2: dist2(aPt, bPt) };
}

//////////////////// Polyline helpers ////////////////////

function* segmentsOf(poly: Polyline): Generator<{ i: number; a: Point; b: Point }> {
  for (let i = 0; i + 1 < poly.length; i++) {
    yield { i, a: poly[i], b: poly[i + 1] };
  }
}

//////////////////// Public API ////////////////////

/**
 * Closest points between two polylines.
 * Early-exits on intersection (distance = 0).
 */
export function closestBetweenPolylines(polyA: Polyline, polyB: Polyline): ClosestResult {
  let best: ClosestResult | null = null;

  for (const sa of segmentsOf(polyA)) {
    for (const sb of segmentsOf(polyB)) {
      // Intersect? return immediately with distance 0 and the intersection point duplicated
      const ip = segmentIntersection(sa.a, sa.b, sb.a, sb.b);
      if (ip) {
        return { distance: 0, a: ip, b: ip, segA: sa.i, segB: sb.i, tA: 0, tB: 0 };
      }

      // Otherwise check closest segment–segment pair
      const r = closestPointsOnSegments(sa.a, sa.b, sb.a, sb.b);
      if (!best || r.d2 < best.distance * best.distance - EPS) {
        best = {
          distance: Math.sqrt(r.d2),
          a: r.a,
          b: r.b,
          segA: sa.i,
          segB: sb.i,
          tA: r.tA,
          tB: r.tB,
        };
      }
    }
  }

  // Handle degenerate polylines (length < 2) by falling back to point-vs-segment/point
  if (!best) {
    if (polyA.length === 1 && polyB.length === 1) {
      const d = Math.sqrt(dist2(polyA[0], polyB[0]));
      return { distance: d, a: polyA[0], b: polyB[0], segA: 0, segB: 0, tA: 0, tB: 0 };
    }
    if (polyA.length === 1 && polyB.length >= 2) {
      let min: ClosestResult | null = null;
      for (const sb of segmentsOf(polyB)) {
        const r = closestPointsOnSegments(polyA[0], polyA[0], sb.a, sb.b);
        const d = Math.sqrt(r.d2);
        if (!min || d < min.distance) {
          min = { distance: d, a: r.a, b: r.b, segA: 0, segB: sb.i, tA: r.tA, tB: r.tB };
        }
      }
      if (min) { return min; }
    }
    if (polyB.length === 1 && polyA.length >= 2) {
      let min: ClosestResult | null = null;
      for (const sa of segmentsOf(polyA)) {
        const r = closestPointsOnSegments(sa.a, sa.b, polyB[0], polyB[0]);
        const d = Math.sqrt(r.d2);
        if (!min || d < min.distance) {
          min = { distance: d, a: r.a, b: r.b, segA: sa.i, segB: 0, tA: r.tA, tB: r.tB };
        }
      }
      if (min) { return min; }
    }
    // If we still have nothing, both were empty or singletons mishandled
    throw new Error("Invalid polylines: need at least one point each.");
  }

  return best;
}

/**
 * Closest points between two MultiLineStrings (arrays of polylines).
 * Early-exits on intersection.
 */
export function closestBetweenMultiLines(multA: MultiLine, multB: MultiLine): ClosestResult {
  let best: ClosestResult | null = null;

  for (let iA = 0; iA < multA.length; iA++) {
    for (let iB = 0; iB < multB.length; iB++) {
      const r = closestBetweenPolylines(multA[iA], multB[iB]);
      if (r.distance <= EPS) {
        return { ...r, lineA: iA, lineB: iB };
      }
      if (!best || r.distance < best.distance) {
        best = { ...r, lineA: iA, lineB: iB };
      }
    }
  }

  if (!best) { throw new Error("Invalid multilines: empty inputs."); }
  return best;
}
