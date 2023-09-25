import React from 'react'
import Card from './Card'

const CategoryMenuList = ({ foodCat, menuItems, search = '' }) => {
  return (
    <div>
      {foodCat.length > 0 ? (
        foodCat.map(category => (
          <div key={category._id} className='m-3'>
            <h2 className='fs-3'>{category.CategoryName}</h2>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4'>
              {menuItems
                .filter(item => {
                  // Check if there is no search term or if the item matches the search term
                  return (
                    (!search ||
                      item.name.toLowerCase().includes(search.toLowerCase())) &&
                    item.CategoryName === category.CategoryName
                  )
                })
                .map(filteredItem => (
                  <div key={filteredItem._id} className='col'>
                    <Card
                      foodItem={filteredItem}
                      options={filteredItem.options}                      
                    />
                  </div>
                ))}
              {menuItems.filter(item => {
                // Check if there is no search term or if the item matches the search term
                return (
                  (!search ||
                    item.name.toLowerCase().includes(search.toLowerCase())) &&
                  item.CategoryName === category.CategoryName
                )
              }).length === 0 && <p>No items found for this category.</p>}
            </div>
          </div>
        ))
      ) : (
        <div>No categories available</div>
      )}
    </div>
  )
}

export default CategoryMenuList
