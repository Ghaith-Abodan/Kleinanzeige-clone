import { NextRequest } from 'next/server';

export { default } from 'next-auth/middleware';

export const config={
    matcher:[
        "/favorites",
        "/properties",
        "/listings",
        "/features",
        "/users",
        "/dashboard",
        "/subcategories",
        "/categories"
    ]
}

  