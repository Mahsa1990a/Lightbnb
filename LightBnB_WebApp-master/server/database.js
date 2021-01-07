const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;
  const values = [email];
  return pool.query(queryString, values)
    .then(res => res.rows[0] || null)
    //console.log("res.rows[0]", res.rows[0]) obj of row
    .catch(e => console.log(e));
  
  // OR : 
  //return pool.query(`
  // SELECT * FROM users
  // WHERE email = $1
  // `, [email])
}
exports.getUserWithEmail = getUserWithEmail;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // return Promise.resolve(users[id]);
  const queryString = `
    SELECT *
    FROM users
    WHERE id = $1;
  `;
  const values = [id];
  return pool.query(queryString, values)
    .then(res => res.rows[0] || null)
    .catch(e => console.log(e));
}
exports.getUserWithId = getUserWithId;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
  INSERT INTO users(name, email, password) 
  VALUES ($1, $2, $3) 
  RETURNING *;
  `;
  const values = [user.name, user.email, user.password];
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(e => console.log(e));
  //You need RETURNING * otherwise 'res' wont contain anything because your SQL query is an insertion and not a SELECT.
  //Add RETURNING *; to the end of an INSERT query to return the objects that were inserted. AND :
  //This is(RETURNING *) handy when you need the auto generated id of an object you've just added to the database
  
}
//Checking in psql after sign up:
//SElECT * FROM users
//WHERE email = 'amerimahsa@yahoo.com';

exports.addUser = addUser;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
//If you login and want to see all of your reservation:
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT properties.*, reservations.*
  FROM properties
  JOIN reservations ON reservations.property_id = properties.id
  WHERE reservations.guest_id= $1 
  AND end_date < now()::date
  LIMIT $2;
  `;
  const values = [guest_id, limit];
  return pool.query(queryString, values)
  .then(res => res.rows)
  .catch(e => console.log(e));
};
exports.getAllReservations = getAllReservations;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// search:
const getAllProperties = function(options, limit = 10) {

  // 1 Setup an array to hold any parameters that may be available for the query
  const queryParams = [];

  // 2 Start the query with all information that comes before WHERE
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id;
  `;

  // 3 Check if a city has been passed in as an option
  if (options.city) {
    queryParams.push(`%${options.city}%`); //Add the city to the params array
    queryString += `WHERE city LIKE $${queryParams.length} `; //create a WHERE clause for the city
  } //              We can use the length of the array to dynamically get the $n placeholder number

  // 4 Add any query that comes after the WHERE clause
  queryParams.push(limit);
  queryString += `
   GROUP BY properties.id
   ORDER BY cost_per_night
   LIMIT $${queryParams.length};
  `;

  // 5 Console log everything just to make sure we've done it right
  console.log(queryString, queryParams);

  // 6 Run the query
  return pool.query(queryString, queryParams)
  .then(res => res.rows);

  //old:
  // return pool.query(`
  //   SELECT * FROM properties
  //   LIMIT $1
  //   `, [limit])
  //   // .then(res => {
  //   //   console.log(res.rows)    //for test
  //   // });
  //   .then(res => res.rows);

}
exports.getAllProperties = getAllProperties;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
