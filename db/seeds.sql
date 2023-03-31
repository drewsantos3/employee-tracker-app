use employee_tracker_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Accounting'),
    ('Human Resources'),
    ('Marketing'):

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Head of Sales', 250000, 1),
    ('Salesman', 150000, 1),
    ('Head Accountant', 150000, 2),
    ('Accountant', 120000, 2),
    ('Head of HR', 150000, 3),
    ('HR Specialist', 100000, 3),
    ('Marketing Manager', 180000, 4),
    ('Marketing Specialist', 150000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Jordan', 1, NULL),
    ('Scottie', 'Pippen', 2, 1),
    ('Dennis', 'Rodman', 3, NULL),
    ('Tony', 'Kukoc', 4, 3),
    ('Larry', 'Bird', 5, NULL),
    ('Kevin', 'Mchale', 6, 5),
    ('Karl', 'Malone', 7, NULL),
    ('Magic', 'Johnson', 8, 7);