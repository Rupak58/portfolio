import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect("schooldata.db")
cur = conn.cursor()

# ✅ Create table if it doesn't exist
cur.execute("""
CREATE TABLE IF NOT EXISTS student_info (
    roll_no INTEGER PRIMARY KEY,
    name TEXT,
    Fname TEXT,
    Mname TEXT,
    fee TEXT
)
""")
conn.commit()

print("Welcome to WsCube School!")
print('''Press:
1. To enter student info.
2. To enter fee info.
3. For Principal access.
4. Exit!''')

access_code = 112233
info_dict1 = {}

while True:
    try:
        x = int(input("Enter: "))
    except ValueError:
        print("Invalid input! Please enter a number.")
        continue

    if x == 1:
        try:
            y = int(input("Enter number of students: "))
        except ValueError:
            print("Invalid number!")
            continue

        for i in range(1, y + 1):
            print(f"\nEnter info for Student no: {i}")
            try:
                roll_no = int(input("Enter roll no: "))
                name = input("Enter student name: ")
                Fname = input("Enter father's name: ")
                Mname = input("Enter mother's name: ")

                info_list = [roll_no, name, Fname, Mname, "null"]
                data = "INSERT INTO student_info VALUES (?, ?, ?, ?, ?)"
                cur.execute(data, info_list)
                conn.commit()

                info_dict1[roll_no] = [name, Fname, Mname, "null"]
                print("✅ Student added successfully.")
            except Exception as e:
                print(f"❌ Error: {e}")

    elif x == 2:
        try:
            y = int(input("Enter student roll no: "))
            if y in info_dict1:
                print("Please Enter fee for", info_dict1[y][0])
                fee = int(input("Enter fee: "))
                info_dict1[y][3] = fee
                temp_list = [fee, y]
                data = "UPDATE student_info SET fee = ? WHERE roll_no = ?"
                cur.execute(data, temp_list)
                conn.commit()
                print("✅ Fee updated successfully.")
            else:
                print("❌ Student does not exist in memory! (Only in database?)")
        except Exception as e:
            print(f"❌ Error: {e}")

    elif x == 3:
        code = int(input("Enter access code: "))
        if code == access_code:
            try:
                x = int(input("Enter student roll no to search: "))
                cur.execute("SELECT * FROM student_info WHERE roll_no = ?", (x,))
                data = cur.fetchone()
                if data:
                    print("\n✅ Student Found:")
                    print("Roll No:", data[0])
                    print("Name:", data[1])
                    print("Father's Name:", data[2])
                    print("Mother's Name:", data[3])
                    print("Fee:", data[4])
                else:
                    print("❌ Student not found in database.")
            except Exception as e:
                print(f"❌ Error: {e}")
        else:
            print("❌ Incorrect access code.")

    elif x == 4:
        print("✅ Thank you for using the system.")
        break

    else:
        print("❌ Invalid choice, try again!")

# Close the database connection
conn.close()
