CREATE TABLE IF NOT EXISTS comments(
   id INT,
   name TEXT,
   comment TEXT
);

INSERT INTO comments(id, name, comment) VALUES
(1, 'Shashank', 'this is a test comment.');

SELECT * FROM comments;



