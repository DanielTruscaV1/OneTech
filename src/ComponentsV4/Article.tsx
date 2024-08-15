import styles from "./ArticleStyle.module.css"

const Article = () => {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <h1 className={styles.title}>
                Data Structures and Algorithms - String Algorithms in C++
            </h1>
            <h2>
              The string data type
            </h2>
            <p>
            A string in C++ is a sequence of characters that can be managed as a single entity. Unlike C-style strings, which are arrays of characters terminated by a null character ('\0'), C++ strings are more flexible and easier to work with. They handle memory management automatically and provide various member functions to operate on the text.
            </p>
            <h2>
              Including the String Header
            </h2>
            <p>
              To use the string class, include the &lt;string&gt; header in your program:
            </p>
            <pre>
              <code>
                  #include &lt;string&gt;
              </code>
            </pre>
            <h2>
              Declaring Strings
            </h2>
            <p>
            You can declare a string variable in C++ as follows:
            </p>
            <pre>
              <code>
              std::string str1; // Default constructor, initializes an empty string
              <br/>
              std::string str2 = "Hello, World!"; // Initialized with a string literal
              <br/>
              std::string str3("Hello, C++!"); // Initialized with a C-style string
              </code>
            </pre>
            <h2>
              String Operations
            </h2>
            <p>
            You can concatenate strings using the + operator or the append method:
            </p>
            <pre>
              <code>
              std::string fullMessage = str1 + " " + str2; // Using + operator
              <br/>
              str1.append(" ").append(str2); // Using append method
              </code>
            </pre>
            <p>
            You can access individual characters using the [] operator or the at method:
            </p>
            <pre>
              <code>
              char ch = str1[0]; // Access the first character
              <br/>
              char ch = str1.at(0); // Access the first character with bounds checking

              </code>
            </pre>
            <p>
            Strings can be modified using various methods such as push_back, pop_back, insert, and erase:
            </p>
            <pre>
              <code>
              char ch = str1[0]; // Access the first character
              <br/>
              char ch = str1.at(0); // Access the first character with bounds checking

              </code>
            </pre>
            <h2>
            String Comparison
            </h2>
            <p>
            Strings can be compared using relational operators (==, !=, &lt;, &gt;, etc.) or the compare method:
            </p>
            <pre>
              <code>
              bool equal = (str1 == str2); // Checks if strings are equal
              <br/>
              int result = str1.compare(str2); // Returns 0 if equal, &lt; 0 if str1 &lt; str2, &gt; 0 otherwise

              </code>
            </pre>
        </div>
    </div>
  )
}

export default Article