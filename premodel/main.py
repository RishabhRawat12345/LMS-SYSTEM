import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

print("Starting training...")

df = pd.read_csv("course_training.csv")

le_interest = LabelEncoder()
le_level = LabelEncoder()
le_category = LabelEncoder()

df["interest"] = le_interest.fit_transform(df["interest"])
df["level"] = le_level.fit_transform(df["level"])
df["category"] = le_category.fit_transform(df["category"])

X = df[["interest", "level", "budget"]]
y = df["category"]

model = RandomForestClassifier(random_state=42)
model.fit(X, y)

joblib.dump(
    {
        "model": model,
        "le_interest": le_interest,
        "le_level": le_level,
        "le_category": le_category,
    },
    "course_model.pkl",
)

print("Model trained successfully!")