SELECT title, properties.id, owner_id, city, cost_per_night , avg(rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  WHERE properties.id > 2008
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT 20;