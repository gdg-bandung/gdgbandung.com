# JSON Seed Data Format

This directory contains JSON files used for seeding the database with initial data. The seed data follows a specific format that must be adhered to ensure proper database population.

## Users Data Format

The `users.json` file contains an array of user objects with the following required fields:

```json
[
  {
    "name": "Fikri Alwan",
    "email": "fikriar93@gmail.com",
    "password": "password"
  }
]
```

### Required Fields

- `name`: User's full name (string)
- `email`: User's email address (string)
- `password`: User's password (string)

### Notes

1. All fields are required and must follow the specified types
2. The data structure must be a valid JSON array
3. Email addresses must be unique across all users

## Usage

The seed data is loaded and processed by the [seed.ts](../seed.ts) script, which:
1. Reads the JSON data from this directory
2. Generates unique IDs for each user
3. Inserts the data into the database
4. Logs the progress during seeding

## Adding New Users

To add new users:
1. Create a new user object following the format above
2. Add it to the array in `users.json`
3. Run the seed script to populate the database

## Important

- Always ensure the JSON is valid before running the seed script
- Backup your existing data before running seed operations
- Make sure email addresses are unique across all users
- The seed script will automatically generate UUIDs for each user, do not include them in the JSON data
