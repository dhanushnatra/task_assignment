from database.db import get_db

def create_task(title, description):
    con, cursor = get_db()
    try:
        cursor.execute(
            """
            INSERT INTO tasks (title, description)
            VALUES (%s, %s)
            """,
            (title, description)
        )
        con.commit()
        task_id = cursor.lastrowid
        return task_id
    finally:
        cursor.close()
        con.close()

def get_task(task_id):
    con, cursor = get_db()
    try:
        cursor.execute(
            "SELECT id, title, description, is_done FROM tasks WHERE id = %s;",
            (task_id,)
        )
        task = cursor.fetchone()
        if task is None:
            return None
        return {"task_id": task[0], "title": task[1], "description": task[2], "is_done": task[3]}
    finally:
        cursor.close()
        con.close()

def update_task(task_id, title=None, description=None, is_done=None):
    con, cursor = get_db()
    try:
        query = "UPDATE tasks SET "
        fields = []
        values = []

        if title is not None:
            fields.append("title = %s")
            values.append(title)

        if description is not None:
            fields.append("description = %s")
            values.append(description)

        if is_done is not None:
            fields.append("is_done = %s")
            values.append(is_done)

        query += ", ".join(fields)
        query += " WHERE id = %s;"
        values.append(task_id)

        cursor.execute(query, tuple(values))
        con.commit()
    finally:
        cursor.close()
        con.close()

def get_all_tasks():
    con, cursor = get_db()
    try:
        cursor.execute("SELECT * FROM tasks;")
        tasks = cursor.fetchall()
        
        if len(tasks) == 0:
            return []
        out_json =[]
        for task in tasks:
            print(task)
            out_json.append(
                {
                    "id":task[0],
                    "title":task[1],
                    "description":task[2],
                    "is_done":task[3]
                }
            )
        return out_json
    finally:
        cursor.close()
        con.close()


def delete_task(task_id):
    con, cursor = get_db()
    try:
        cursor.execute("DELETE FROM tasks WHERE id = %s;", (task_id,))
        con.commit()
    finally:
        cursor.close()
        con.close()
