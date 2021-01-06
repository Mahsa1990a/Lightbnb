SELECT properties.*, reservations.*, AVG(property_reviews.rating) AS average_rating
--FROM property_reviews
--JOIN reservations ON property_reviews.reservation_id = reservations.id
--JOIN properties ON reservations.property_id = properties.id
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = 1 
-- WHERE properties.owner_id = 1 WRONG because it said: The reservations will be for a single user, so use 1 for the user_id.
AND reservations.end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date
LIMIT 10;