# OpCode Cheat Sheet for zintML

## Before json processing
- `include full/path` (works in code)
- `includeTemplate` (works in code)

## Pages

- `PSEP` separator page

## Generic

- `//` Comment:

## include files

- `ICSS` include css file
- `IJS` include javascript file

## Head processing

- `H` Insert head block of html
- `HD` Insert head block of html for development
- `T` slide title (`VMA`)

## Column formatting

### 1-column

- `1` 1-column `***deprecated***`

### 2-column

- `2` 2-columns (`VMA`)
- `C&V` code+visualization (?)
- `H&J` html+js (?)

### 3-column

- `3` 3-columns (`VMRA`)
- `H&C&J` html+css+js (?)

## Static blocks

- `DEF` definition
- `EX` example

## Interactive blocks

- `SH` show/hide
- `SA` show answer (?)
- `SI` show implementation (?)
- `Q&A` question with hidden answer

## Info blocks

- `DEF` definition
- `SY` syntax
- `IDYK` do-you-know
- `IRK` remark
- `IRD` reminder
- `Q` question only
- `AL` algorithm
- `CO` computer output
- `CI` citation (?)
- `SE` see (?)

## inline opcodes

- `def{aaa}def` term defined
- `ee{aaa}ee` emphasis
- `loc{aaa}loc` memory location in ST&M
- `lv{aaa}lm{bbb}la` inline link `aaa` url, `bbb` visible text
- `syx{aaa}syx` syntax
- `val{aaa}val` value in memory location in ST&M
- `var{aaa}var` variable name in ST&M
- `kw{aaa}kw` key word (?)
- `cit{aaa}cit` citation (?)

### Step-by-step (SBS)

- `SBS` SBS description (`VMA`)
- `SBSB` include board `.js` file, i.e., `*.board.js`
- `SBSC` include code `.md` file, i.e., `*.code.md`
- `SBSD` include description `.md` file, i.e., `*.dscr.md`
- `SBSH` include highlight `.md` file, i.e., `*.highlight.txt`
- `SBST` include trace `.md` file, i.e., `*.trace.txt`






