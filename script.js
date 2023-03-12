class MenuItem {
    constructor(itemName, price){
        this.itemName = itemName;
        this.price = price;
    }

    describe() {
        return `${this.itemName} $${this.price}.`;
    }
}

class Category{
    constructor(categoryName){
        this.categoryName = categoryName;
        this.menuItems = [];
    }

    describe(){
        if (this.menuItems.length == 1){
            return `${this.categoryName} has ${this.menuItems.length} menu item.\n`;
        }
        return `${this.categoryName} has ${this.menuItems.length} menu items.\n`;
    }
}

class Menu {
    constructor() {
        this.categories = [];
        this.selectedCategory = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while(selection != 0) {
            switch(selection){
                case '1':
                    this.createCategory();
                    break;
                case '2':
                    this.viewCategory();
                    break;
                case '3':
                    this.DeleteCategory();
                    break;
                case '4':
                    this.displayCategories();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new category
        2) view category
        3) Delete category
        4) display category
        `);
    }

    showTeamMenuOptions(menuItemInfo) {
        return prompt(`
            0) back
            1) create menu item
            2) delete menu item
            ---------------------
            ${menuItemInfo}
        `);
    }
    displayCategories() {
        let categoryString = '';
        for (let i = 0; i < this.categories.length; i++){
            categoryString += (i) + ') ' + this.categories[i].categoryName + '\n';
            
        }
        alert(categoryString);
    }

    createCategory() {
        let categoryName = prompt('Enter Name for your new category: ');
        this.categories.push(new Category(categoryName));
    }

    viewCategory() {
        let index = prompt('Enter the index of the category you wish to view: ');
        if (index > -1 && index < this.categories.length){
            this.selectedCategory = this.categories[index];
            let description = this.selectedCategory.describe();

            for (let i = 0; i < this.selectedCategory.menuItems.length; i++){
                description += i + ') ' + this.selectedCategory.menuItems[i].describe();
                 
            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection){
                case '1':
                    this.createMenuItem();
                    break;
                case '2':
                    this.deleteMenuItem();
            }
        }
    }

    DeleteCategory(){
        let index = prompt('Enter the index of the team you wish to delete:');
        if(index > -1 && index < this.categories.length){
            this.categories.splice(index, 1);
        }
    }

    createMenuItem(){
        let itemName = prompt('Enter name for new menu item:');
        let price = prompt('Enter price for the new menu item:');
        this.selectedCategory.menuItems.push(new MenuItem(itemName, price));
    }

    deleteMenuItem() {
        let index = prompt('Enter the index of the menu Item you wish to delete:');
        if (index > -1 && index < this.selectedCategory.menuItems.length){
            this.selectedCategory.menuItems.splice(index, 1);
        }
    }

}

let menu = new Menu();
menu.start();