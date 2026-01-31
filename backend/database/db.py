import mysql.connector

init_table:bool = False

def init_(con,cursor):
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100),
        description VARCHAR(100),
        is_done BOOLEAN DEFAULT FALSE
    )
    """)
    cursor.execute(
        """
        INSERT INTO tasks (title, description)
        VALUES (%s, %s)
        """,
        ("learn js", "learn devops before march 2026",)
    )

    con.commit()

def get_db():
    global init_table
    con = mysql.connector.connect(
        host="db",
        user="taskuser",
        password="taskpass",
        database="taskdb",
        port=3306
    )
    cursor = con.cursor()

    if not init_table:
        init_(con=con,cursor=cursor)
        init_table = True

    return con,cursor

