'use strict';

const STORE ={ 
    items: [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
],
filtered: false,
search: '',
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span contenteditable="true" class="shopping-item js-shopping-item
      ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <button class="edit-button">edit</button>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  

    let filteredItems = [...STORE.items]
    let searchValue = STORE.search
  // insert that HTML into the DOM
 
    if(STORE.filtered === true){
        filteredItems = filteredItems.filter(item => {
            return item.checked === false
        }
    )}
    else if(STORE.search !== ""){
        filteredItems = filteredItems.filter(item =>{
            console.log(searchValue)
            return item.name === searchValue
            
        })
    }
    

    const shoppingListItemsString = generateShoppingItemsString(filteredItems);
    $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItemClicked(itemIndex){
    STORE.items.splice(itemIndex,1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      deleteItemClicked(itemIndex);
      renderShoppingList();
  })
  console.log('`handleDeleteItemClicked` ran')
}

function filterItems(filtered){
    STORE.filtered === !STORE.filtered
}

function handleFilteredItems(){
    $('.shopping-list-filter').on('change',e => {
    
    STORE.filtered = !STORE.filtered;

    renderShoppingList();
    }
)
}

function handleSearch(){
    $('#shopping-list-search').submit(function(event){
    event.preventDefault();
    const newSearch = $('.search-list-entry').val();
    $('.search-list-entry').val('');
    STORE.search = newSearch;
    renderShoppingList()
    })
}



function handleNameEdit(){
    $('.js-item-index-element').on('click','.edit-button', event =>{
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        nameEdit(itemIndex);
        renderShoppingList();
    })
        
    
}


// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleFilteredItems();
  handleSearch();
  handleNameEdit();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);