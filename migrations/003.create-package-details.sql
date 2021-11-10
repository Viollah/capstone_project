CREATE TABLE IF NOT EXISTS package_details (
id INTEGER PRIMARY KEY AUTOINCREMENT,
item TEXT,
fare DECIMAL(10,2),
ninja_id TEXT,
address_locality TEXT,
city TEXT,
pincode INTEGER,
user_id INTEGER,
order_id TEXT,
pick_up_address TEXT,
drop_off_address TEXT
);