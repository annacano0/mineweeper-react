Feature: Minesweeper

  As a player:
  - I want to play to the classic minesweeper game
  - So I want to detect all the mines in the board

  How to refer to a cell: 
  - Using the (row,column) nomenclature
  - Rows and columns starts from 1

  How to load mock data: 
  - Using the <ctrl>+m keyboard combination to discover
    the load mock data form

  To define the board data will use: 
    "o" No mine
    "*" Mine
    "-" Row separator

    There are two ways to define mock data:
    - Inline:
      "*-ooo-*oo"
    - Table:
      | * | * | * |
      | o | o | o |
      | * | o | o |

  To define the board display will use:
    COVERED CELLS
      "." Hidden cell
      "!" Cell tagged has mined cell by the player
      "x" Cell wrongly tagged has no mined cell by the player
    UNCOVERED CELLS
      "0" Empty cell
      "1" Clean cell with 1 adjacent mine
      "2" Clean cell with 2 adjacent mines
      "3" Clean cell with 3 adjacent mines
      "4" Clean cell with 4 adjacent mines
      "5" Clean cell with 5 adjacent mines
      "6" Clean cell with 6 adjacent mines
      "7" Clean cell with 7 adjacent mines
      "8" Clean cell with 8 adjacent mines
      "9" Clean cell with 9 adjacent mines
      "@" highlighted mine


Scenario Outline: Uncovering cell with no mine - Displaying number of adyacent mines
Given the player loads the following mock data "<boardData>"
When the player clicks left on cell (2,2) 
Then the cell should show: "number"

Examples:
|  boardData  |  number |
| *oo-ooo-ooo |       1 | 
| *oo-ooo-oo* |       2 | 
| ***-ooo-ooo |       3 | 
| ***-*oo-ooo |       4 | 
| ***-*o*-ooo |       5 | 
| ***-*o*-*oo |       6 | 
| ***-*o*-**o |       7 | 
| ***-*o*-*** |       8 | 


Scenario Outline: Uncovering cell with no mine or mines arround - Displaying an empty cell
Given the player loads the following mock data:
  """
  | o | o | o |
  | o | o | o |
  | o | o | o |
  | * | * | * |
  """
When the player clicks left on cell (2,2) 
Then the cell should show: empty

#esto no explica bien la recursividad
Scenario Outline: Uncovering cell with no mine or mines arround - Displaying sorrounding empty cells
Given the player loads the following mock data: "<boardData>"
  """
  | o | o | o |
  | o | o | o |
  | o | * | o |
  """
When the player clicks left on cell "<cell>"
Then the sorrounding empty cells should uncover : "<adjacentEmpty>"

Examples:
| cell |                   adjacentEmpty                  |
| (1,1)|                              (1,2), (1,3), (2,2) | 
| (1,2)|                (1,1), (1,3), (2,1), (2,2), (2,3) | 
| (1,3)|                              (1,2), (2,2), (2,3) | 
| (2,1)|                       (1,1), (1,2), (2,2), (3,1) | 
| (2,2)|  (1,1), (1,2), (1,3), (2,1), (2,3), (3,1), (3,3) | 
| (2,3)|                       (1,2), (1,3), (2,2), (3,3) | 
| (3,1)|                                     (2,1), (2,2) | 
| (3,3)|                                     (2,2), (2,3) | 


Scenario Outline: Uncovering cell with mine  - Displaying mine
Given the player loads the following mock data:  
  """
  | o | o | o |
  | o | * | o |
  | o | o | o |
  """
When the player clicks left on cell (2,2) 
Then the cell should show: "@"
And player loses


Scenario Outline: Tagging cells with mine
Given the following mock data: 
  """
  | o | o | o |
  | o | * | o |
  | o | o | o |
  """
When the player clicks right on the cell (2,2) 
Then The cell should show : "!"


Scenario Outline: Tagging cells with no mine
Given the following mock data: 
  """
  | o | o | * |
  | o | o | o |
  | * | o | o |
  """
When the player clicks right on the cell (2,2) 
Then The cell should show : "x"


Scenario Outline: Running timer
Given Seconds passed from game start is "seconds"
Then the timer should show "<timerDisplay>"

Examples: 
| seconds | timerDisplay |
|       0 |          000 |
|      60 |          060 |
|      61 |          061 |
|     999 |          999 |
|    1000 |          999 |


Scenario Outline: Tagging cells with no mine - Substracting to flag counter
Given the following mock data: "<boardData>"
When the player tags the cell (2,2) 
Then The cell should show : "x"
And counter should show: "<flagCounter>"

Examples: 
|  boardData  |  flagCounter |
| ooo-ooo-ooo |           -1 | 
| *oo-ooo-ooo |            0 | 
| *oo-ooo-oo* |            1 | 
| *o*-ooo-o*o |            2 | 
| ***-*oo-ooo |            3 | 
| ***-*o*-ooo |            4 | 
| ***-*o*-*oo |            5 | 
| ***-*o*-**o |            6 | 
| ***-*o*-*** |            7 | 


Scenario Outline: Untagging cells - Adding to flagCounter
Given the following mock data: "<boardData>"
When the player untags the cell (2,2) 
Then The display should show : "."
And counter should show: "<flagCounter>"

Examples: 
|  boardData  |  flagCounter |
| ooo-ooo-ooo |            0 | 
| *oo-ooo-ooo |            1 | 
| *oo-ooo-oo* |            2 | 
| *o*-ooo-o*o |            3 | 


Scenario Outline: Winning the game
Given the player has uncovered all empty cells
Then player wins

#---------- scenarios ----------#
Scenario: Game starts - By uncovering a cell
Given the player reveals a cell
Then cells should be covered
And all cells should be enabled
And the timer should start
And "smileyIcon" status should change to "normal"


Scenario: Game starts - By tagging a cell
Given the player taggs a cell
Then cells should be covered
And all cells chould be enabled
And the timer should start
And "smileyIcon" status should change to "normal"


Scenario: Game ends - By player losing
Then mines are uncovered 
And all cells should be disabled
And timer should stop
And "smileyIcon" status should change to "defeat"


Scenario: Game ends - By player winning
Then all cells should be disabled
And timer should stop
And "smileyIcon" status should change to "victory"


Scenario Outline: Initializing game
Given the player clicks on "smileyIcon" button
Then timer should be "000"
And all cells should be enabled
And all cells should be covered


Scenario: Cell is tagged
Then cell should be disabled

Scenario: Cell is untagged
Then cell should be enabled

Scenario: Cell is uncovered
Then cell should be disabled