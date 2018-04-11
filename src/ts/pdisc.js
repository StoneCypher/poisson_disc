const seq     = n      => new Array(n).fill(false).map( (__, i) => i ), // eslint-disable-lin
      rand_f  = n      => Math.random() * n,
      rnd     = n      => Math.floor(Math.random() * n),
      rnd_pi  = ()     => rnd(Math.PI),
      rnd_2pi = ()     => rnd(Math.PI * 2),
      rnd_in  = bounds => bounds.map(range => rnd(range));





function array_product(NumArr) {
  return NumArr.reduce( (acc,i) => acc*i, 1 );
}





function polar_to_cart(rad, angles) {

  const output = (new Array(angles.length + 1)).fill(0);

  let cumul_sin = rad;

  angles.map( (angle, idx) => {
    output[idx]  = Math.cos(angle) * cumul_sin;
    cumul_sin   *= Math.sin(angle);
  });

  output[angles.length] = cumul_sin;  // last one's kinda lol, idnit

  return output;

}





function cart_plus_polar(cart, rad, angles) {

  if (cart.length !== (angles.length + 1)) {
    throw new TypeError(
      'Cartesian coordinates must be same dimensionality as polar (rad+angles) - cart 3d = rad + 2 angles, etc'
    );
  }

  const ofs = polar_to_cart(rad, angles);

  return cart.map( (c,i) => c + ofs[i]);

}





// makes a random coordinate within a nearby hollowed n-sphere
//
// if you're at [W,X,Y,Z], and you need a point at least A but no more than B
// away, such as wanted for a poisson n-sphere sampling, this function's for
// you.  quite literally, in fact.
//
// this returns a [W',X',Y',Z'] satisfying a between-A-to-B move from [W,X,Y,Z]
//
// this does not floor coordinates, and returns floats.

function rand_cwn_hnsphere(center, min, max) {

  // we need one angle fewer than there are dimensions.  on a circle we need
  // one, on a sphere we need two, on a hypersphere we need three, etc.

  const angles = seq(center.length - 1).map(__ => rnd_pi()),
        r      = rand_f(max-min) + min;

  return cart_plus_polar(center, r, angles);

}





function poisson_dense({

  min_dist    = 10,
  max_dist    = 20,
  max_retries = 30,
  bounds      = [100,100],
  default_val = null

  // make random point picker configurable
  // make point accepter configurable too

}) {

  const dimensions = bounds.length,
        gridSz     = array_product(bounds),
        grid       = new Array(gridSz).fill(default_val),
        scale      = min_dist / Math.sqrt(dimensions),

        result     = [ rnd_in(bounds) ],  // one location initially sampled
        active     = [ 0 ];               // first active is always location 0, duh



  while (active.length) {

  }

}





export { poisson_dense };
