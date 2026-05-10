'use client'

import { useState } from 'react'

export default function PackingListPage() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Clothing',
      items: [
        { id: 1, name: 'T-shirts', packed: false, quantity: 5 },
        { id: 2, name: 'Jeans', packed: true, quantity: 2 },
        { id: 3, name: 'Underwear', packed: false, quantity: 7 },
        { id: 4, name: 'Jacket', packed: false, quantity: 1 }
      ]
    },
    {
      id: 2,
      name: 'Documents',
      items: [
        { id: 5, name: 'Passport', packed: true, quantity: 1 },
        { id: 6, name: 'Flight tickets', packed: false, quantity: 1 },
        { id: 7, name: 'Hotel reservations', packed: false, quantity: 1 },
        { id: 8, name: 'Travel insurance', packed: false, quantity: 1 }
      ]
    },
    {
      id: 3,
      name: 'Electronics',
      items: [
        { id: 9, name: 'Phone charger', packed: true, quantity: 1 },
        { id: 10, name: 'Camera', packed: false, quantity: 1 },
        { id: 11, name: 'Power bank', packed: false, quantity: 1 },
        { id: 12, name: 'Headphones', packed: false, quantity: 1 }
      ]
    },
    {
      id: 4,
      name: 'Toiletries',
      items: [
        { id: 13, name: 'Toothbrush', packed: false, quantity: 1 },
        { id: 14, name: 'Shampoo', packed: false, quantity: 1 },
        { id: 15, name: 'Sunscreen', packed: false, quantity: 1 },
        { id: 16, name: 'Medications', packed: false, quantity: 1 }
      ]
    }
  ])

  const toggleItem = (categoryId: number, itemId: number) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? {
            ...category,
            items: category.items.map(item =>
              item.id === itemId ? { ...item, packed: !item.packed } : item
            )
          }
        : category
    ))
  }

  const addItem = (categoryId: number) => {
    const newItem = {
      id: Date.now(),
      name: '',
      packed: false,
      quantity: 1
    }
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, items: [...category.items, newItem] }
        : category
    ))
  }

  const removeItem = (categoryId: number, itemId: number) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, items: category.items.filter(item => item.id !== itemId) }
        : category
    ))
  }

  const totalItems = categories.reduce((sum, category) => sum + category.items.length, 0)
  const packedItems = categories.reduce((sum, category) => 
    sum + category.items.filter(item => item.packed).length, 0
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Packing Checklist</h1>
          <p className="mt-2 text-gray-600">European Adventure • June 15-30, 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Progress</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {packedItems} of {totalItems} items packed
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">
                  {Math.round((packedItems / totalItems) * 100)}%
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{width: `${(packedItems / totalItems) * 100}%`}}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <button
                      onClick={() => addItem(category.id)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm"
                    >
                      + Add Item
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center flex-1">
                          <input
                            type="checkbox"
                            checked={item.packed}
                            onChange={() => toggleItem(category.id, item.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const updatedCategories = categories.map(cat =>
                                cat.id === category.id
                                  ? {
                                      ...cat,
                                      items: cat.items.map(i =>
                                        i.id === item.id ? { ...i, name: e.target.value } : i
                                      )
                                    }
                                  : cat
                              )
                              setCategories(updatedCategories)
                            }}
                            className={`ml-3 flex-1 border-0 bg-transparent focus:ring-2 focus:ring-indigo-500 rounded ${
                              item.packed ? 'line-through text-gray-400' : 'text-gray-900'
                            }`}
                            placeholder="Enter item name"
                          />
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const updatedCategories = categories.map(cat =>
                                cat.id === category.id
                                  ? {
                                      ...cat,
                                      items: cat.items.map(i =>
                                        i.id === item.id ? { ...i, quantity: parseInt(e.target.value) || 1 } : i
                                      )
                                    }
                                  : cat
                              )
                              setCategories(updatedCategories)
                            }}
                            className="ml-2 w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center"
                            min="1"
                          />
                        </div>
                        <button
                          onClick={() => removeItem(category.id, item.id)}
                          className="ml-2 text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Reset Checklist
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                Save Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
