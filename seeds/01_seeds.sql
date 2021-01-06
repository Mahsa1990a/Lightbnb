INSERT INTO users (name, email, password)
VALUES ('Eva li', 'eva@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Lousia Meyer', 'lousia@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic parks', 'dominic@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Speed lamp', 'desc', 'url', 'url', 800, 2, 2, 1, 'Canada', '651 Hejto Rd', 'Toronto', 'Ontario', 'lll333', true ), 
(2, 'Blavk corner', 'desc', 'url', 'url', 2000, 3, 2, 3, 'Canada', '179 Hartford', 'Toronto', 'Ontario', 'lll222', true),
(3, 'Habit Mix', 'desc', 'url', 'url', 3000, 2, 2, 6, 'Canada', '30 Hejto Rd', 'Toronto', 'Ontario', 'lll444', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-12-30', '2019-01-30', 1, 3),
('2020-10-30', '2020-11-30', 2, 1), 
('2021-01-01', '2021-02-01', 1, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 1, 3, 'msg'),
(3, 1, 2, 5, 'msg'),
(2, 3, 3, 6, 'msg');