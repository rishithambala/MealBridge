import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import pickle

data = pd.read_csv("dataset.csv")

X = data[["meals_required", "people_served"]]
y = data["priority"]

model = DecisionTreeClassifier()

model.fit(X, y)

pickle.dump(model, open("model.pkl", "wb"))

print("Model trained successfully")