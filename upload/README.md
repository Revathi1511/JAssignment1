# Some changes from last time

## Local modules
The page routes and menuLinks DB functions have been moved into different files (found in modules/menuLinks/). Each of
these files are modules (see the modules.exports lines at the end of the files for exporting the functionality).

When we break down our code into smaller chunks like this with requires/exports, we're actually creating local modules
within our app.

## Organized views
You can organize your views files into subdirectories to group related pages. If you are using **extends** you'll have
to take into account the path changes for views within subdirectories. For example, menu-add.pug has

**extends ../layout**

as the first line.

