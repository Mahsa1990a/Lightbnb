--SELECT properties.id, title, cost_per_night, AVG(rating) AS average_rating
SELECT properties.*, AVG(property_reviews.rating) AS average_rating
FROM properties
JOIN property_reviews ON properties.id = property_reviews.property_id
-- WHERE city = 'Vancouver' because in seeds it's like : 'North Vancouver'
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING AVG(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;
