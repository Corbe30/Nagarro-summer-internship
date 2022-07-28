ALTER TABLE comments
ADD email TEXT;

DELETE FROM comments
where id=1;

INSERT INTO comments(id, name, comment, phone, email) VALUES
(100, 'Shashank', 'Employee of the month 2021', '9910712463', 'shashankc1705@gmail.com');

INSERT INTO comments(id, name, comment, phone, email) VALUES
(101, 'Jane Doe', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '9876543210', 'janedoe@gmail.com');