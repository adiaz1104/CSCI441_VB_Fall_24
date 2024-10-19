-- Create User table
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- Create Family table
CREATE TABLE Family (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create FamilyMember table
CREATE TABLE FamilyMember (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "User"(id),
    family_id INTEGER REFERENCES Family(id)
);

-- Create Calendar table
CREATE TABLE Calendar (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER,
    name VARCHAR(100) NOT NULL,
    owner_type VARCHAR(10) CHECK (owner_type IN ('User', 'Family'))
);

-- Create Event table
CREATE TABLE Event (
    id SERIAL PRIMARY KEY,
    calendar_id INTEGER REFERENCES Calendar(id),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    start_datetime TIMESTAMP NOT NULL,
    end_datetime TIMESTAMP NOT NULL,
    location VARCHAR(255)
);

-- Create Task table
CREATE TABLE Task (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "User"(id),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    due_date DATE,
    status VARCHAR(20) NOT NULL
);

-- Create ShoppingList table
CREATE TABLE ShoppingList (
    id SERIAL PRIMARY KEY,
    family_id INTEGER REFERENCES Family(id),
    name VARCHAR(100) NOT NULL
);

-- Create ShoppingItem table
CREATE TABLE ShoppingItem (
    id SERIAL PRIMARY KEY,
    shopping_list_id INTEGER REFERENCES ShoppingList(id),
    name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL
);

-- Create Reminder table
CREATE TABLE Reminder (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "User"(id),
    related_id INTEGER,
    related_type VARCHAR(10) CHECK (related_type IN ('Event', 'Task')),
    reminder_time TIMESTAMP NOT NULL,
    notification_type VARCHAR(20) NOT NULL
);

-- Add foreign key constraints
ALTER TABLE Calendar
ADD CONSTRAINT fk_calendar_owner_user
FOREIGN KEY (owner_id) 
REFERENCES "User"(id);

ALTER TABLE Calendar
ADD CONSTRAINT fk_calendar_owner_family
FOREIGN KEY (owner_id) 
REFERENCES Family(id);

-- Create partial indexes to enforce the conditional foreign key constraints
CREATE INDEX idx_calendar_owner_user
ON Calendar(owner_id)
WHERE owner_type = 'User';

CREATE INDEX idx_calendar_owner_family
ON Calendar(owner_id)
WHERE owner_type = 'Family';

CREATE INDEX idx_reminder_event
ON Reminder(related_id)
WHERE related_type = 'Event';

CREATE INDEX idx_reminder_task
ON Reminder(related_id)
WHERE related_type = 'Task';