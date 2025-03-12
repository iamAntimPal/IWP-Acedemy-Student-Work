print("\nThis is the try.py file.")
print("The __name__ variable is set to: ", __name__)

if __name__ == "__main__":
     print("\nThis script is being run directly.")
else:
     print("\nThis script is being imported from another module.")
