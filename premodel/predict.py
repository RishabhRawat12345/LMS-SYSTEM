import sys
import joblib

saved_data = joblib.load("course_model.pkl")

model = saved_data["model"]
le_interest = saved_data["le_interest"]
le_level = saved_data["le_level"]
le_category = saved_data["le_category"]

if len(sys.argv) < 4:
    print("Usage: python predict.py <interest> <level> <budget>")
    sys.exit(1)

interest_input = sys.argv[1]
level_input = sys.argv[2]
budget_input = int(sys.argv[3])

interest = le_interest.transform([interest_input])[0]
level = le_level.transform([level_input])[0]

prediction = model.predict([[interest, level, budget_input]])
category = le_category.inverse_transform(prediction)

print(category[0])