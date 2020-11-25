#TV
zint Markup Language (`zintML`)
#TM
zintML Home Page
#TA
#ES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#1V

# Introduction


There are three types of zintML commands.
- single line such as `//`
- 2-line such as `R`
- 3-line such as `2`


# Syntax
A `zintML` markup composed of a number of charters starting at column one without any space.
1. `#` at column 1 (as any MarkupML command)
1. one or more op codes starting column 2
1. if it is 1-line
    1. nothing
1. if it is 2-line
    1. `V` indicating the beginning a block (as if an arrow downwards)
    1. `A` indicating the end of the block (as if an arrow upwards)
1. if it is 3-line
    1. `V` indicating the beginning the first block (as if an arrow downwards)
    1. `M` indicating the beginning the second block (comes from "Middle")
    1. `A` indicating the end of the block (as if an arrow upwards)
1. at least one space


## Examples

#### 1-line 

```markdown
    #// comment is 1-line
```


#### 2-line

```markdown
    #RV Remark is 2-line
    aaa
    #RA Remark is 2-line
```

#### 3-line

```markdown
    #2V 2-column is 3-line
    aaa
    #2M 2-column is 3-line
    bbb
    #2A 2-column is 3-line
```

```markdown
#// comment is 1-line
```

# List of `zintML` commands

## 1-line commands
- [//](tag_comment.html)
- [ES](tag_ES.html)

## 2-line commands
- [1](tag_1.html)

## 3-line commands
- [2](tag_2.html)
    - [2 nested](tag_2_nested.html)
- [T](tag_T.html)
- [R](tag_R.html)

#1A

