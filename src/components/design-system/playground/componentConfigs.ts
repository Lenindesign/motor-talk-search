
import { ComponentType, ComponentConfig } from './types';

export const components: Record<ComponentType, ComponentConfig> = {
  button: {
    name: 'Button',
    description: 'Interactive button component with various styles and states',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        name: 'variant',
        options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'outline', 'ghost', 'link', 'minimal']
      },
      size: {
        type: 'select',
        label: 'Size',
        name: 'size',
        options: ['sm', 'md', 'lg', 'xl', 'icon-sm', 'icon', 'icon-lg']
      },
      disabled: {
        type: 'boolean',
        label: 'Disabled',
        name: 'disabled'
      },
      withIcon: {
        type: 'boolean',
        label: 'With Icon',
        name: 'withIcon'
      },
      text: {
        type: 'text',
        label: 'Button Text',
        name: 'text'
      }
    }
  },
  badge: {
    name: 'Badge',
    description: 'Small status descriptors for UI elements',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        name: 'variant',
        options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'outline', 'ghost', 'link', 'minimal']
      },
      text: {
        type: 'text',
        label: 'Badge Text',
        name: 'text'
      }
    }
  },
  card: {
    name: 'Card',
    description: 'Container for related content and actions',
    properties: {
      withHeader: {
        type: 'boolean',
        label: 'With Header',
        name: 'withHeader'
      },
      withFooter: {
        type: 'boolean',
        label: 'With Footer',
        name: 'withFooter'
      },
      title: {
        type: 'text',
        label: 'Title',
        name: 'title'
      },
      description: {
        type: 'text',
        label: 'Description',
        name: 'description'
      },
      cardType: {
        type: 'select',
        label: 'Card Type',
        name: 'cardType',
        options: ['article', 'photo', 'video', 'newCar', 'usedCar']
      }
    }
  }
};
