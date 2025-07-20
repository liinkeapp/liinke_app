import { CollectionConfig } from 'payload'
import slugify from 'slugify'

const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'transactionType', 'price', 'status'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.title && !data.slug) {
          data.slug = slugify(data.title, { lower: true, strict: true })
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Automatically generated from title if left empty.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value, { lower: true, strict: true })
            if (data?.title) return slugify(data.title, { lower: true, strict: true })
            return value
          },
        ],
      },
    },

    {
      name: 'category',
      type: 'select',
      options: ['land', 'houses', 'rentals', 'commercial', 'comrade'],
      required: true,
    },

    {
      name: 'transactionType',
      type: 'select',
      required: true,
      options: ['buy', 'rent', 'lease'],
    },

    {
      name: 'price',
      type: 'number',
      required: true,
    },

    {
      name: 'bedrooms',
      type: 'number',
      required: false,
      admin: {
        condition: (_, siblingData) => !['land', 'commercial'].includes(siblingData?.category),
      },
    },

    {
      name: 'bathrooms',
      type: 'number',
      required: false,
      admin: {
        condition: (_, siblingData) => !['land', 'commercial'].includes(siblingData?.category),
      },
    },

    {
      name: 'status',
      type: 'select',
      options: ['available', 'occupied', 'under construction'],
      defaultValue: 'available',
    },

    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'lat',
          type: 'number',
          required: true,
        },
        {
          name: 'lng',
          type: 'number',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
        },
      ],
    },

    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      required: false,
      hasMany: true,
    },

    {
      name: 'description',
      type: 'textarea',
      required: true,
    },

    {
      name: 'features',
      type: 'array',
      label: 'Property Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },

    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
    },
  ],
}

export default Properties
