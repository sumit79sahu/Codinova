import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice(
    {
        name: 'product',
        initialState: [],
        reducers: {
            clear(state,action){
              return action.payload
            },
            add(state, action) {
                const { name } = action.payload;
              
                if (state.length !== 0) {
                  const existingProduct = state.find(product => product.name === name);
              
                  if (existingProduct) {
                    return state.map(product =>
                      product.name === name ? { ...product, count: product.count + 1 } : product
                    );
                  } else {
                    return [...state, { ...action.payload, count: 1 }];
                  }
                }
                return [...state, { ...action.payload, count: 1 }];
              },

            remove(state, action) {
                return state.filter(data => data.name !== action.payload)
            },
            counter(state,action)
            {
              const { name ,count} = action.payload;
              return state.map(product =>
                product.name === name ? { ...product,count} : product
              );
            }
        }
    }
)
export const { add, remove ,counter,clear} = productSlice.actions;
export default productSlice.reducer;