import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

type ButtonProps = {
  variant: 'solid' | 'solid-light' | 'outline-black' | 'ghost-black' | 'solid-red' | 'solid-red-light' | 'outline-red' | 'ghost-red' | 'solid-primary' | 'solid-primary-light' | 'outline-primary' | 'ghost-primary' | 'minimal' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  withIcon: boolean;
  text: string;
};

type BadgeProps = {
  variant: 'destructive' | 'outline' | 'secondary' | 'default';
  text: string;
};

type CardProps = {
  title: string;
  description: string;
  withHeader: boolean;
  withFooter: boolean;
  cardType: 'default' | 'article' | 'video' | 'car' | 'photo';
};

type ComponentConfig = {
  name: string;
  description: string;
  properties: Record<string, {
    type: 'select' | 'boolean' | 'text';
    label: string;
    options?: string[];
  }>;
};

type ComponentState = {
  button: ButtonProps;
  badge: BadgeProps;
  card: CardProps;
};

const componentConfigs: Record<keyof ComponentState, ComponentConfig> = {
  button: {
    name: 'Button',
    description: 'Interactive button component with multiple variants and sizes',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'minimal', 'ghost', 'link']
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg']
      },
      disabled: {
        type: 'boolean',
        label: 'Disabled'
      },
      withIcon: {
        type: 'boolean',
        label: 'With Icon'
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  badge: {
    name: 'Badge',
    description: 'A small badge component',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['destructive', 'outline', 'secondary', 'default']
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  card: {
    name: 'Card',
    description: 'A card container component',
    properties: {
      title: {
        type: 'text',
        label: 'Title'
      },
      description: {
        type: 'text',
        label: 'Description'
      },
      withHeader: {
        type: 'boolean',
        label: 'With Header'
      },
      withFooter: {
        type: 'boolean',
        label: 'With Footer'
      },
      cardType: {
        type: 'select',
        label: 'Card Type',
        options: ['default', 'article', 'video', 'car', 'photo']
      }
    }
  }
};

const ComponentPlayground: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<keyof ComponentState>('button');
  const [state, setState] = useState<ComponentState>({
    button: {
      variant: 'solid',
      size: 'md',
      disabled: false,
      withIcon: false,
      text: 'Button'
    },
    badge: {
      variant: 'default',
      text: 'Badge'
    },
    card: {
      title: 'Card Title',
      description: 'Card Description',
      withHeader: true,
      withFooter: true,
      cardType: 'default'
    }
  });

  const handlePropertyChange = (key: string, value: string | boolean) => {
    setState(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value
      }
    }));
  };

  const renderComponent = () => {
    const props = state[selectedComponent];
    
    switch (selectedComponent) {
      case 'button':
        const buttonProps = props as ButtonProps;
        return (
          <Button
            variant={buttonProps.variant}
            size={buttonProps.size}
            disabled={buttonProps.disabled}
          >
            {buttonProps.withIcon && <Download className="mr-2 h-4 w-4" />}
            {buttonProps.text}
          </Button>
        );
      case 'badge':
        const badgeProps = props as BadgeProps;
        return (
          <Badge variant={badgeProps.variant}>{badgeProps.text}</Badge>
        );
      case 'card':
        const cardProps = props as CardProps;
        return (
          <Card>
            {cardProps.withHeader && (
              <CardHeader>
                <CardTitle>{cardProps.title}</CardTitle>
                <CardDescription>{cardProps.description}</CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <p className="text-sm">Card Content</p>
            </CardContent>
            {cardProps.withFooter && (
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            )}
          </Card>
        );
      default:
        return null;
    }
  };

  const currentConfig = componentConfigs[selectedComponent];

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight mb-4">Component Playground</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Component</h3>
              <select
                value={selectedComponent}
                onChange={(e) => setSelectedComponent(e.target.value as keyof ComponentState)}
                className="w-full p-2 border rounded mb-4"
              >
                {Object.entries(componentConfigs).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
              
              <h3 className="text-lg font-semibold mb-2">Properties</h3>
              <div className="space-y-4">
                {Object.entries(currentConfig.properties).map(([key, prop]) => (
                  <div key={key} className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">{prop.label}</label>
                    {prop.type === 'select' ? (
                      <select
                        value={String(state[selectedComponent][key as keyof typeof state[typeof selectedComponent]])}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        className="p-2 border rounded"
                      >
                        {prop.options?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : prop.type === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={Boolean(state[selectedComponent][key as keyof typeof state[typeof selectedComponent]])}
                        onChange={(e) => handlePropertyChange(key, e.target.checked)}
                        className="h-4 w-4"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(state[selectedComponent][key as keyof typeof state[typeof selectedComponent]])}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        className="p-2 border rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <div className="border rounded bg-white p-4 flex items-center justify-center min-h-[200px]">
                {renderComponent()}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Code Snippet</h3>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    <code>{JSON.stringify(state[selectedComponent], null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponentPlayground;

type ButtonProps = {
  variant: 'solid' | 'solid-light' | 'outline-black' | 'ghost-black' | 'solid-red' | 'solid-red-light' | 'outline-red' | 'ghost-red' | 'solid-primary' | 'solid-primary-light' | 'outline-primary' | 'ghost-primary' | 'minimal' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  withIcon: boolean;
  text: string;
};

type BadgeProps = {
  variant: 'destructive' | 'outline' | 'secondary' | 'default';
  text: string;
};

type CardProps = {
  title: string;
  description: string;
  withHeader: boolean;
  withFooter: boolean;
  cardType: 'default' | 'article' | 'video' | 'car' | 'photo';
};

type ComponentConfig = {
  name: string;
  description: string;
  properties: Record<string, {
    type: 'select' | 'boolean' | 'text';
    label: string;
    options?: string[];
  }>;
};

type ComponentState = {
  button: ButtonProps;
  badge: BadgeProps;
  card: CardProps;
};

const componentConfigs: Record<keyof ComponentState, ComponentConfig> = {
  button: {
    name: 'Button',
    description: 'Interactive button component with multiple variants and sizes',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'minimal', 'ghost', 'link']
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg']
      },
      disabled: {
        type: 'boolean',
        label: 'Disabled'
      },
      withIcon: {
        type: 'boolean',
        label: 'With Icon'
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  badge: {
    name: 'Badge',
    description: 'A small badge component',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['destructive', 'outline', 'secondary', 'default']
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  card: {
    name: 'Card',
    description: 'A card container component',
    properties: {
      title: {
        type: 'text',
        label: 'Title'
      },
      description: {
        type: 'text',
        label: 'Description'
      },
      withHeader: {
        type: 'boolean',
        label: 'With Header'
      },
      withFooter: {
        type: 'boolean',
        label: 'With Footer'
      },
      cardType: {
        type: 'select',
        label: 'Card Type',
        options: ['default', 'article', 'video', 'car', 'photo']
      }
    }
  }
};

const ComponentPlayground: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<keyof ComponentState>('button');
  const [state, setState] = useState<ComponentState>({
    button: {
      variant: 'solid',
      size: 'md',
      disabled: false,
      withIcon: false,
      text: 'Button'
    },
    badge: {
      variant: 'default',
      text: 'Badge'
    },
    card: {
      title: 'Card Title',
      description: 'Card Description',
      withHeader: true,
      withFooter: true,
      cardType: 'default'
    }
  });

  const handlePropertyChange = (key: string, value: string | boolean) => {
    setState(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value
      }
    }));
  };

  const renderComponent = () => {
    const props = state[selectedComponent];
    
    switch (selectedComponent) {
      case 'button':
        const buttonProps = props as ButtonProps;
        return (
          <Button
            variant={buttonProps.variant}
            size={buttonProps.size}
            disabled={buttonProps.disabled}
          >
            {buttonProps.withIcon && <Download className="mr-2 h-4 w-4" />}
            {buttonProps.text}
          </Button>
        );
      case 'badge':
        const badgeProps = props as BadgeProps;
        return (
          <Badge variant={badgeProps.variant}>{badgeProps.text}</Badge>
        );
      case 'card':
        const cardProps = props as CardProps;
        return (
          <Card>
            {cardProps.withHeader && (
              <CardHeader>
                <CardTitle>{cardProps.title}</CardTitle>
                <CardDescription>{cardProps.description}</CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <p className="text-sm">Card Content</p>
            </CardContent>
            {cardProps.withFooter && (
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            )}
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight mb-4">Component Playground</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Component</h3>
              <select
                value={selectedComponent}
                onChange={(e) => setSelectedComponent(e.target.value as keyof ComponentState)}
                className="w-full p-2 border rounded mb-4"
              >
                {Object.entries(componentConfigs).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
              
              <h3 className="text-lg font-semibold mb-2">Properties</h3>
              <div className="space-y-4">
                {Object.entries(componentConfigs[selectedComponent].properties).map(([key, prop]) => (
                  <div key={key} className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">{prop.label}</label>
                    {prop.type === 'select' ? (
                      <select
                        value={String(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        className="p-2 border rounded"
                      >
                        {prop.options?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : prop.type === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={Boolean(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.checked)}
                        className="h-4 w-4"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        className="p-2 border rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <div className="border rounded bg-white p-4 flex items-center justify-center">
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponentPlayground;

type ButtonProps = {
  variant: 'solid' | 'solid-light' | 'outline-black' | 'ghost-black' | 'solid-red' | 'solid-red-light' | 'outline-red' | 'ghost-red' | 'solid-primary' | 'solid-primary-light' | 'outline-primary' | 'ghost-primary' | 'minimal' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  withIcon: boolean;
  text: string;
};

type BadgeProps = {
  variant: 'destructive' | 'outline' | 'secondary' | 'default';
  text: string;
};

type CardProps = {
  title: string;
  description: string;
  withHeader: boolean;
  withFooter: boolean;
  cardType: 'default' | 'article' | 'video' | 'car' | 'photo';
};

type ComponentConfig = {
  name: string;
  description: string;
  properties: Record<string, {
    type: 'select' | 'boolean' | 'text';
    label: string;
    options?: string[];
  }>;
};

type ComponentState = {
  button: ButtonProps;
  badge: BadgeProps;
  card: CardProps;
};

const componentConfigs: Record<keyof ComponentState, ComponentConfig> = {
  button: {
    name: 'Button',
    description: 'Interactive button component with multiple variants and sizes',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'minimal', 'ghost', 'link']
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg']
      },
      disabled: {
        type: 'boolean',
        label: 'Disabled'
      },
      withIcon: {
        type: 'boolean',
        label: 'With Icon'
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  badge: {
    name: 'Badge',
    description: 'A small badge component',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['destructive', 'outline', 'secondary', 'default']
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  card: {
    name: 'Card',
    description: 'A card container component',
    properties: {
      title: {
        type: 'text',
        label: 'Title'
      },
      description: {
        type: 'text',
        label: 'Description'
      },
      withHeader: {
        type: 'boolean',
        label: 'With Header'
      },
      withFooter: {
        type: 'boolean',
        label: 'With Footer'
      },
      cardType: {
        type: 'select',
        label: 'Card Type',
        options: ['default', 'article', 'video', 'car', 'photo']
      }
    }
  }
};

export const ComponentPlayground: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<keyof ComponentState>('button');
  const [state, setState] = useState<ComponentState>({
    button: {
      variant: 'solid',
      size: 'md',
      disabled: false,
      withIcon: false,
      text: 'Button'
    },
    badge: {
      variant: 'default',
      text: 'Badge'
    },
    card: {
      title: 'Card Title',
      description: 'Card Description',
      withHeader: true,
      withFooter: true,
      cardType: 'default'
    }
  });

  const handlePropertyChange = (key: string, value: string | boolean) => {
    setState(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value
      }
    }));
  };

  const renderComponent = () => {
    const props = state[selectedComponent];
    
    switch (selectedComponent) {
      case 'button':
        return (
          <Button
            variant={props.variant}
            size={props.size}
            disabled={props.disabled}
          >
            {props.withIcon && <Download className="mr-2 h-4 w-4" />}
            {props.text}
          </Button>
        );
      case 'badge':
        return (
          <Badge variant={props.variant}>{props.text}</Badge>
        );
      case 'card':
        return (
          <Card>
            {props.withHeader && (
              <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <p className="text-sm">Card Content</p>
            </CardContent>
            {props.withFooter && (
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            )}
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight mb-4">Component Playground</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Component</h3>
              <select
                value={selectedComponent}
                onChange={(e) => setSelectedComponent(e.target.value as keyof ComponentState)}
                className="w-full p-2 border rounded mb-4"
              >
                {Object.entries(componentConfigs).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
              
              <h3 className="text-lg font-semibold mb-2">Properties</h3>
              <div className="space-y-4">
                {Object.entries(componentConfigs[selectedComponent].properties).map(([key, prop]) => (
                  <div key={key} className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">{prop.label}</label>
                    {prop.type === 'select' ? (
                      <select
                        value={String(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        className="p-2 border rounded"
                      >
                        {prop.options?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : prop.type === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={Boolean(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.checked)}
                        className="h-4 w-4"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        className="p-2 border rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <div className="border rounded bg-white p-4 flex items-center justify-center">
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

type ButtonProps = {
  variant: 'solid-primary' | 'solid-primary-light' | 'outline-primary' | 'ghost-primary' | 'minimal' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  withIcon: boolean;
  text: string;
};

type BadgeProps = {
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  text: string;
};

type CardProps = {
  title: string;
  description: string;
  withHeader: boolean;
  withFooter: boolean;
  cardType: 'default' | 'article' | 'video' | 'car' | 'photo';
};

type ComponentConfig = {
  name: string;
  description: string;
  properties: Record<string, {
    type: 'select' | 'boolean' | 'text';
    label: string;
    options?: string[];
  }>;
};

type ComponentState = {
  button: ButtonProps;
  badge: BadgeProps;
  card: CardProps;
};

const componentConfigs: Record<keyof ComponentState, ComponentConfig> = {
  button: {
    name: 'Button',
    description: 'Interactive button component with multiple variants and sizes',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'minimal', 'ghost', 'link']
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg']
      },
      disabled: {
        type: 'boolean',
        label: 'Disabled'
      },
      withIcon: {
        type: 'boolean',
        label: 'With Icon'
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  badge: {
    name: 'Badge',
    description: 'A small badge component',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['destructive', 'outline', 'secondary', 'default']
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  card: {
    name: 'Card',
    description: 'A card container component',
    properties: {
      title: {
        type: 'text',
        label: 'Title'
      },
      description: {
        type: 'text',
        label: 'Description'
      },
      withHeader: {
        type: 'boolean',
        label: 'With Header'
      },
      withFooter: {
        type: 'boolean',
        label: 'With Footer'
      },
      cardType: {
        type: 'select',
        label: 'Card Type',
        options: ['default', 'article', 'video', 'car', 'photo']
      }
    }
  }
};

export const ComponentPlayground: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<keyof ComponentState>('button');
  const [state, setState] = useState<ComponentState>({
    button: {
      variant: 'solid-primary',
      size: 'md',
      disabled: false,
      withIcon: false,
      text: 'Button'
    },
    badge: {
      variant: 'default',
      text: 'Badge'
    },
    card: {
      title: 'Card Title',
      description: 'Card Description',
      withHeader: true,
      withFooter: true,
      cardType: 'default'
    }
  });

  const handlePropertyChange = (key: string, value: string | boolean) => {
    setState(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value
      }
    }));
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'button': {
        const props = state[selectedComponent];
        return (
          <Button
            variant={props.variant}
            size={props.size}
            disabled={props.disabled}
          >
            {props.withIcon && <Download className="mr-2 h-4 w-4" />}
            {props.text}
          </Button>
        );
      }
      case 'badge': {
        const props = state[selectedComponent];
        return (
          <Badge variant={props.variant}>{props.text}</Badge>
        );
      }
      case 'card': {
        const props = state[selectedComponent];
        return (
          <Card>
            {props.withHeader && (
              <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <p className="text-sm">Card Content</p>
            </CardContent>
            {props.withFooter && (
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            )}
          </Card>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight mb-4">Component Playground</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Component</h3>
              <select
                value={selectedComponent}
                onChange={(e) => setSelectedComponent(e.target.value as keyof ComponentState)}
                className="w-full p-2 border rounded mb-4"
              >
                {Object.entries(componentConfigs).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
              
              <h3 className="text-lg font-semibold mb-2">Properties</h3>
              <div className="space-y-4">
                {Object.entries(componentConfigs[selectedComponent].properties).map(([key, prop]) => (
                  <div key={key} className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">{prop.label}</label>
                    {prop.type === 'select' ? (
                      <select
                        value={String(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        className="p-2 border rounded"
                      >
                        {prop.options?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : prop.type === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={Boolean(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.checked)}
                        className="h-4 w-4"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        className="p-2 border rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <div className="border rounded bg-white p-4 flex items-center justify-center">
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
  withIcon: boolean;
  text: string;
};

type BadgeProps = {
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  text: string;
};

type CardProps = {
  title: string;
  description: string;
  withHeader: boolean;
  withFooter: boolean;
};

type ComponentProps = {
type ComponentConfig = {
  name: string;
  description: string;
  properties: Record<string, {
    type: 'select' | 'boolean' | 'text';
    label: string;
    options?: string[];
  }>;
};

type ComponentState = {
  button: ButtonProps;
  badge: BadgeProps;
  card: CardProps;
};

const componentConfigs: Record<keyof ComponentState, ComponentConfig> = {
  button: {
    name: 'Button',
    description: 'Interactive button component with multiple variants and sizes',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'minimal', 'ghost', 'link']
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg']
      },
      disabled: {
        type: 'boolean',
        label: 'Disabled'
      },
      withIcon: {
        type: 'boolean',
        label: 'With Icon'
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  badge: {
    name: 'Badge',
    description: 'Status indicator component',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['default', 'secondary', 'destructive', 'outline']
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  card: {
    name: 'Card',
    description: 'Container for content',
    properties: {
      title: {
        type: 'text',
        label: 'Title'
      },
      description: {
        type: 'text',
        label: 'Description'
      },
      withHeader: {
        type: 'boolean',
        label: 'Show Header'
      },
      withFooter: {
        type: 'boolean',
        label: 'Show Footer'
      }
    }
  }
};
        type: 'select',
        label: 'Variant',
        options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'minimal', 'ghost', 'link']
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg']
      },
      disabled: {
        type: 'boolean',
        label: 'Disabled'
      },
      withIcon: {
        type: 'boolean',
        label: 'With Icon'
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  badge: {
    name: 'Badge',
    description: 'A small badge component',
    properties: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['destructive', 'outline', 'secondary', 'default']
      },
      text: {
        type: 'text',
        label: 'Text'
      }
    }
  },
  card: {
    name: 'Card',
    description: 'A card container component',
    properties: {
      title: {
        type: 'text',
        label: 'Title'
      },
      description: {
        type: 'text',
        label: 'Description'
      },
      withHeader: {
        type: 'boolean',
        label: 'With Header'
      },
      withFooter: {
        type: 'boolean',
        label: 'With Footer'
      },
      cardType: {
        type: 'select',
        label: 'Card Type',
        options: ['default', 'article', 'video', 'car', 'photo']
      }
    }
  }
} as const;

export export const ComponentPlayground: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<keyof ComponentState>('button');
  const [state, setState] = useState<ComponentState>({
    button: {
      variant: 'solid-primary',
      size: 'md',
      disabled: false,
      withIcon: false,
      text: 'Button'
    },
    badge: {
      variant: 'default',
      text: 'Badge'
    },
    card: {
      title: 'Card Title',
      description: 'Card Description',
      withHeader: true,
      withFooter: true
    }
  });

  const handlePropertyChange = (key: string, value: string | boolean) => {
    setState(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value
      }
    }));
  };

  const renderComponent = () => {
    const props = state[selectedComponent];

    switch (selectedComponent) {
      case 'button':
        const buttonProps = props as ButtonProps;
        return (
          <Button
            variant={buttonProps.variant}
            size={buttonProps.size}
            disabled={buttonProps.disabled}
          >
            {buttonProps.withIcon && <Download className="mr-2 h-4 w-4" />}
            {buttonProps.text}
          </Button>
        );
      case 'badge':
        const badgeProps = props as BadgeProps;
        return (
          <Badge variant={badgeProps.variant}>{badgeProps.text}</Badge>
        );
      case 'card':
        const cardProps = props as CardProps;
        return (
          <Card>
            {cardProps.withHeader && (
              <CardHeader>
                <CardTitle>{cardProps.title}</CardTitle>
                <CardDescription>{cardProps.description}</CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <p className="text-sm">Card Content</p>
            </CardContent>
            {cardProps.withFooter && (
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            )}
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight mb-4">Component Playground</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Component</h3>
              <select
                value={selectedComponent}
                onChange={(e) => setSelectedComponent(e.target.value as keyof ComponentState)}
                className="w-full p-2 border rounded mb-4"
              >
                {Object.entries(componentConfigs).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
              
              <h3 className="text-lg font-semibold mb-2">Properties</h3>
              <div className="space-y-4">
                {Object.entries(componentConfigs[selectedComponent].properties).map(([key, prop]) => (
                  <div key={key} className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">{prop.label}</label>
                    {prop.type === 'select' ? (
                      <select
                        value={String(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        className="p-2 border rounded"
                      >
                        {prop.options?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : prop.type === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={Boolean(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.checked)}
                        className="h-4 w-4"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(state[selectedComponent][key])}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        className="p-2 border rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <div className="border rounded bg-white p-4 flex items-center justify-center">
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
  const [selectedComponent, setSelectedComponent] = useState<keyof ComponentState>('button');
  const [state, setState] = useState<ComponentState>({
    button: {
      variant: 'solid-primary',
      size: 'md',
      disabled: false,
      withIcon: false,
      text: 'Button'
    },
    badge: {
      variant: 'default',
      text: 'Badge'
    },
    card: {
      title: 'Card Title',
      description: 'Card Description',
      withHeader: true,
      withFooter: true
    }
  });

  const handlePropertyChange = (key: string, value: string | boolean) => {
    setState(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value
      }
    }));
  };

  const renderComponent = () => {
    const props = state[selectedComponent];

    switch (selectedComponent) {
      case 'button':
        const buttonProps = props as ButtonProps;
        return (
          <Button
            variant={buttonProps.variant}
            size={buttonProps.size}
            disabled={buttonProps.disabled}
          >
            {buttonProps.withIcon && <Download className="mr-2 h-4 w-4" />}
            {buttonProps.text}
          </Button>
        );
      case 'badge':
        const badgeProps = props as BadgeProps;
        return (
          <Badge variant={badgeProps.variant}>{badgeProps.text}</Badge>
        );
      case 'card':
        const cardProps = props as CardProps;
        return (
          <Card>
            {cardProps.withHeader && (
              <CardHeader>
                <CardTitle>{cardProps.title}</CardTitle>
                <CardDescription>{cardProps.description}</CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <p className="text-sm">Card Content</p>
            </CardContent>
            {cardProps.withFooter && (
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            )}
          </Card>
        );
      default:
        return null;
    }
  };
  const [selectedComponent, setSelectedComponent] = useState<keyof ComponentState>('button');
  const [state, setState] = useState<ComponentState>({
    button: {
      variant: 'solid-primary',
      size: 'md',
      disabled: false,
      withIcon: false,
      text: 'Button'
    },
    badge: {
      variant: 'default',
      text: 'Badge'
    },
    card: {
      title: 'Card Title',
      description: 'Card Description',
      withHeader: true,
      withFooter: true
    }
  });

  const handlePropertyChange = (key: string, value: string | boolean) => {
    setState(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value
      }
    }));
  };

  const renderComponent = () => {
    const props = state[selectedComponent];

    switch (selectedComponent) {
      case 'button':
        return (
          <Button
            variant={props.variant}
            size={props.size}
            disabled={props.disabled}
          >
            {props.withIcon && <Download className="mr-2 h-4 w-4" />}
            {props.text}
          </Button>
        );
      case 'badge':
        return (
          <Badge variant={props.variant}>{props.text}</Badge>
        );
      case 'card':
        return (
          <Card>
            {props.withHeader && (
              <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <p className="text-sm">Card Content</p>
            </CardContent>
            {props.withFooter && (
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            )}
          </Card>
        );
    }
  };
  const [selectedComponent, setSelectedComponent] = useState<keyof ComponentProps>('button');
  const [properties, setProperties] = useState<ComponentProps>({
    button: {
      variant: 'solid-primary',
      size: 'md',
      disabled: false,
      withIcon: false,
      text: 'Button'
    },
    badge: {
      variant: 'default',
      text: 'Badge'
    },
    card: {
      title: 'Card Title',
      description: 'Card Description',
      withHeader: true,
      withFooter: true
    }
  });

  const handlePropertyChange = (key: string, value: string | boolean) => {
    setProperties(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value
      }
    }));
  };

  const renderComponent = () => {
    const props = properties[selectedComponent];
    
    switch (selectedComponent) {
      case 'button':
        return (
          <div className="p-4 flex items-center justify-center">
            <button
              className={`inline-flex items-center justify-center rounded-md font-medium transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                disabled:opacity-50 disabled:pointer-events-none ring-offset-background
                ${props.variant === 'solid-primary' ? 'bg-primary text-white hover:bg-primary/90' :
                  props.variant === 'solid-primary-light' ? 'bg-primary/10 text-primary hover:bg-primary/20' :
                  props.variant === 'outline-primary' ? 'border-2 border-primary text-primary hover:bg-primary/10' :
                  props.variant === 'ghost-primary' ? 'text-primary hover:bg-primary/10' :
                  props.variant === 'minimal' ? 'text-neutral-7 hover:bg-neutral-2' :
                  props.variant === 'ghost' ? 'hover:bg-neutral-2' :
                  'text-primary underline-offset-4 hover:underline'}
                ${props.size === 'sm' ? 'h-9 px-3 text-xs' :
                  props.size === 'lg' ? 'h-11 px-8 text-base' :
                  'h-10 px-4 text-sm'}`}
              disabled={props.disabled}
            >
              {props.withIcon && <Download className="mr-2 h-4 w-4" />}
              {props.text}
            </button>
          </div>
        );
      case 'badge':
        return (
          <div className="p-4 flex items-center justify-center">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors
                ${props.variant === 'secondary' ? 'bg-secondary text-secondary-foreground' :
                  props.variant === 'destructive' ? 'bg-destructive text-destructive-foreground' :
                  props.variant === 'outline' ? 'text-foreground border border-input' :
                  'bg-primary text-primary-foreground'}`}
            >
              {props.text}
            </span>
          </div>
        );
      case 'card':
        return (
          <div className="p-4 flex items-center justify-center">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md">
              {props.withHeader && (
                <div className="p-6 border-b">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">{props.title}</h3>
                  <p className="text-sm text-muted-foreground">{props.description}</p>
                </div>
              )}
              <div className="p-6">
                <p className="text-sm">Card Content</p>
              </div>
              {props.withFooter && (
                <div className="p-6 border-t">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4">
                    Action
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const [selectedComponent, setSelectedComponent] = useState<keyof ComponentProps>('button');
  const [properties, setProperties] = useState<ComponentProps>({
    button: {
      variant: 'solid-primary',
      size: 'md',
      disabled: false,
      withIcon: false,
      text: 'Button'
    },
    badge: {
      variant: 'default',
      text: 'Badge'
    },
    card: {
      title: 'Card Title',
      description: 'Card Description',
      withHeader: true,
      withFooter: true
    }
  });

  const handlePropertyChange = (key: string, value: string | boolean) => {
    setProperties(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value
      }
    }));
  };

  const renderComponent = () => {
    const props = properties[selectedComponent];
    
    switch (selectedComponent) {
      case 'button':
        return (
          <Button
            variant={props.variant}
            size={props.size}
            disabled={props.disabled}
          >
            {props.withIcon && <Download className="mr-2 h-4 w-4" />}
            {props.text}
          </Button>
        );
      case 'badge':
        return (
          <Badge variant={props.variant}>
            {props.text}
          </Badge>
        );
      case 'card':
        return (
          <Card>
            {props.withHeader && (
              <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <p className="typography-body">Card Content</p>
            </CardContent>
            {props.withFooter && (
              <CardFooter>
                <Button variant="solid-primary">Action</Button>
              </CardFooter>
            )}
          </Card>
        );
      default:
        return null;
    }
  };
  const [selectedComponent, setSelectedComponent] = useState<keyof typeof componentConfigs>('button');
  const [properties, setProperties] = useState({
    button: {
      variant: 'solid-primary',
      size: 'md',
      disabled: false,
      withIcon: false,
      text: 'Button'
    },
    badge: {
      variant: 'default',
      text: 'Badge'
    },
    card: {
      title: 'Card Title',
      description: 'Card Description',
      withHeader: true,
      withFooter: true
    }
  });

  const handlePropertyChange = (key: string, value: string | boolean) => {
    setProperties(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value
      }
    }));
  };

  const renderComponent = () => {
    const props = properties[selectedComponent];
    
    switch (selectedComponent) {
      case 'button':
        return (
          <Button
            variant={props.variant}
            size={props.size}
            disabled={props.disabled}
          >
            {props.withIcon && <Download className="mr-2 h-4 w-4" />}
            {props.text}
          </Button>
        );
      case 'badge':
        return (
          <Badge variant={props.variant}>
            {props.text}
          </Badge>
        );
      case 'card':
        return (
          <Card>
            {props.withHeader && (
              <div className="p-4 border-b">
                <h3 className="typography-title">{props.title}</h3>
                <p className="typography-body-small text-neutral-5">{props.description}</p>
              </div>
            )}
            <div className="p-4">
              <p className="typography-body">Card Content</p>
            </div>
            {props.withFooter && (
              <div className="p-4 border-t">
                <Button variant="solid-primary">Action</Button>
              </div>
            )}
          </Card>
        );
      default:
        return null;
    }
  };
  const [selectedComponent, setSelectedComponent] = useState<keyof typeof components>('button');
  const [buttonProps, setButtonProps] = useState<ButtonProperties>({
    variant: 'solid-primary',
    size: 'md',
    disabled: false,
    withIcon: false,
    text: 'Button'
  });
  const [badgeProps, setBadgeProps] = useState<BadgeProperties>({
    variant: 'default',
    text: 'Badge'
  });
  const [cardProps, setCardProps] = useState<CardProperties>({
    title: 'Card Title',
    description: 'Card Description',
    withHeader: true,
    withFooter: false,
    cardType: 'default'
  });
  const [snippets, setSnippets] = useState<{ tsx: string; tailwind: string }>({ tsx: '', tailwind: '' });

  const handlePropertyChange = (property: string, value: string | boolean | number) => {
    if (selectedComponent === 'button') {
      setButtonProps(prev => ({ ...prev, [property]: value }));
    } else if (selectedComponent === 'badge') {
      setBadgeProps(prev => ({ ...prev, [property]: value }));
    } else if (selectedComponent === 'card') {
      setCardProps(prev => ({ ...prev, [property]: value }));
    }
  };

  const generateSnippets = () => {
    let result = { tsx: '', tailwind: '' };

    if (selectedComponent === 'button') {
      const { variant, size, disabled, withIcon, text } = buttonProps;
      result = {
        tsx: `<Button variant="${variant}" size="${size}" disabled={${disabled}} withIcon={${withIcon}}>${text}</Button>`,
        tailwind: 'btn btn-primary'
      };
    } else if (selectedComponent === 'badge') {
      const { variant, text } = badgeProps;
      result = {
        tsx: `<Badge variant="${variant}">${text}</Badge>`,
        tailwind: 'badge badge-primary'
      };
    } else if (selectedComponent === 'card') {
      const { title, description, withHeader, withFooter, cardType } = cardProps;
      result = {
        tsx: `<Card title="${title}" description="${description}" withHeader={${withHeader}} withFooter={${withFooter}} cardType="${cardType}" />`,
        tailwind: 'card'
      };
    }

    return result;
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'button':
        return <Button variant={buttonProps.variant} size={buttonProps.size} disabled={buttonProps.disabled}>
          {buttonProps.withIcon && <Download className="mr-2 h-4 w-4" />}
          {buttonProps.text}
        </Button>;
      case 'badge':
        return <Badge variant={badgeProps.variant}>{badgeProps.text}</Badge>;
      case 'card':
        return <Card>
          {cardProps.withHeader && (
            <CardHeader>
              <CardTitle>{cardProps.title}</CardTitle>
              <CardDescription>{cardProps.description}</CardDescription>
            </CardHeader>
          )}
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
          {cardProps.withFooter && (
            <CardFooter>
              <Button variant="solid-primary">Action</Button>
            </CardFooter>
          )}
        </Card>;
      default:
        return null;
    }
  };

  useEffect(() => {
    const snippets = generateSnippets();
    setSnippets(snippets);
  }, [buttonProps, badgeProps, cardProps, selectedComponent]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-4">
          <h2 className="typography-title mb-4">Component Playground</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="typography-subtitle mb-2">Preview</h3>
              {renderComponent()}
            </div>
            <div>
              <h3 className="typography-subtitle mb-2">Code</h3>
              <pre className="bg-neutral-1 p-4 rounded">
                <code>{snippets.tsx}</code>
              </pre>
            </div>
  const [selectedComponent, setSelectedComponent] = useState<keyof typeof components>('button');
  const [buttonProps, setButtonProps] = useState<ButtonProperties>({
    variant: 'solid-primary',
    size: 'md',
    disabled: false,
    withIcon: false,
    text: 'Button'
  });
  const [badgeProps, setBadgeProps] = useState<BadgeProperties>({
    variant: 'default',
    text: 'Badge'
  });
  const [cardProps, setCardProps] = useState<CardProperties>({
    title: 'Card Title',
    description: 'Card Description',
    withHeader: true,
    withFooter: false,
    cardType: 'default'
  });
  const [snippets, setSnippets] = useState<{ tsx: string; tailwind: string }>({ tsx: '', tailwind: '' });

  const handlePropertyChange = (property: string, value: string | boolean | number) => {
    if (selectedComponent === 'button') {
      setButtonProps(prev => ({ ...prev, [property]: value }));
    } else if (selectedComponent === 'badge') {
      setBadgeProps(prev => ({ ...prev, [property]: value }));
    } else if (selectedComponent === 'card') {
      setCardProps(prev => ({ ...prev, [property]: value }));
    }
  };

  const generateSnippets = () => {
    let result = { tsx: '', tailwind: '' };

    if (selectedComponent === 'button') {
      const { variant, size, disabled, withIcon, text } = buttonProps;
      result = {
        tsx: `<Button variant="${variant}" size="${size}" disabled={${disabled}} withIcon={${withIcon}}>${text}</Button>`,
        tailwind: 'btn btn-primary'
      };
    } else if (selectedComponent === 'badge') {
      const { variant, text } = badgeProps;
      result = {
        tsx: `<Badge variant="${variant}">${text}</Badge>`,
        tailwind: 'badge badge-primary'
      };
    } else if (selectedComponent === 'card') {
      const { title, description, withHeader, withFooter, cardType } = cardProps;
      result = {
        tsx: `<Card title="${title}" description="${description}" withHeader={${withHeader}} withFooter={${withFooter}} cardType="${cardType}" />`,
        tailwind: 'card'
      };
    }

    return result;
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'button':
        return <Button {...buttonProps}>{buttonProps.text}</Button>;
      case 'badge':
        return <Badge {...badgeProps}>{badgeProps.text}</Badge>;
      case 'card':
        return <Card {...cardProps} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const snippets = generateSnippets();
    setSnippets(snippets);
  }, [buttonProps, badgeProps, cardProps, selectedComponent]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-4">
          <h2 className="typography-title mb-4">Component Playground</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="typography-subtitle mb-2">Preview</h3>
              {renderComponent()}
            </div>
            <div>
              <h3 className="typography-subtitle mb-2">Code</h3>
              <pre className="bg-neutral-1 p-4 rounded">
                <code>{snippets.tsx}</code>
              </pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponentPlayground;
    let result = { tsx: '', tailwind: '' };
    if (selectedComponent === 'button') {
      const {
        variant,
        size,
        disabled,
        withIcon,
        text
      } = properties as ButtonProperties;
      const tsxCode = `import { Button } from "@/components/ui/button";
${withIcon ? 'import { Download } from "lucide-react";\n' : ''}
export function ButtonDemo() {
  return (
    <Button
      variant="${variant}"
      size="${size}"${disabled ? '\n      disabled' : ''}
    >${withIcon ? '\n      <Download className="mr-2 h-4 w-4" />' : ''}
      ${text}
    </Button>
  );
}`;
    const tailwindCode = `<button 
  className="${variant === 'default' ? 'bg-primary text-white' : variant === 'destructive' ? 'bg-red-500 text-white' : variant === 'outline' ? 'border border-input bg-transparent' : variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : ''} ${size === 'sm' ? 'h-8 text-xs px-3' : size === 'lg' ? 'h-12 px-6 text-base' : 'h-9 px-4 text-sm'} rounded-md font-medium shadow inline-flex items-center justify-center${disabled ? ' opacity-50 cursor-not-allowed' : ''}"
  disabled={disabled}>
  ${withIcon ? '<svg class="mr-2 h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>' : ''}
  ${text}
</button>`;
    return {
      tsx: tsxCode,
      tailwind: tailwindCode
    };
  }
  if (selectedComponent === 'badge') {
    const {
      variant,
      text
    } = properties as BadgeProperties;
    const tsxCode = `import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return <Badge variant={variant}>{text}</Badge>;
}`;
    const tailwindCode = `<span class="${variant === 'default' ? 'bg-primary text-primary-foreground' : variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : variant === 'destructive' ? 'bg-destructive text-destructive-foreground' : variant === 'outline' ? 'border border-input bg-transparent text-foreground' : ''} rounded-md px-2 py-1 text-xs font-medium">
  ${text}
</span>`;
    return {
      tsx: tsxCode,
      tailwind: tailwindCode
    };
  }
  if (selectedComponent === 'card') {
    const {
      withHeader,
      withFooter,
      title,
      description
    } = properties;
    const tsxCode = `import {
  Card,${withHeader ? '\n  CardHeader,' : ''}${withHeader ? '\n  CardTitle,' : ''}${withHeader && description ? '\n  CardDescription,' : ''}
  CardContent,${withFooter ? '\n  CardFooter,' : ''}
} from "@/components/ui/card";${withFooter ? '\nimport { Button } from "@/components/ui/button";' : ''}

export function CardDemo() {
  return (
    <Card>
      ${withHeader ? `<CardHeader>
        <CardTitle>${title}</CardTitle>${description ? `\n        <CardDescription>${description}</CardDescription>` : ''}
      </CardHeader>` : ''}
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>${withFooter ? `\n      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>` : ''}
    </Card>
  );
}`;
    const tailwindCode = `<div class="rounded-lg border shadow-sm">
  ${withHeader ? `<div class="p-6 flex flex-col space-y-1.5">
    <h3 class="text-lg font-semibold leading-none">${title}</h3>${description ? `\n    <p class="text-sm text-muted-foreground">${description}</p>` : ''}
  </div>` : ''}
  <div class="p-6">
    <p>Card content goes here</p>
  </div>${withFooter ? `\n  <div class="p-6 flex justify-between items-center border-t">
    <button class="inline-flex items-center justify-center rounded-md border px-4 h-9">Cancel</button>
    <button class="inline-flex items-center justify-center rounded-md bg-primary px-4 h-9 text-white">Save</button>
  </div>` : ''}
</div>`;
    return {
      tsx: tsxCode,
      tailwind: tailwindCode
    };
  }
  if (selectedComponent === 'contentCard') {
    const {
      cardType
    } = properties;
    let tsxCode = '';
    let tailwindCode = '';
    if (cardType === 'article') {
      tsxCode = `import ArticleCard from '@/components/ArticleCard';

export function ArticleCardDemo() {
  const article = {
    id: 'art1',
    title: 'Best SUVs for Families in 2025',
    imageUrl: 'https://www.motortrend.com/files/67eeb24ae58cfc000822372c/bestmidsizesuvs.jpg',
    date: '2025-03-15',
    category: 'SUV',
    author: 'Jane Smith',
    readTime: '5 min read'
  };

  return <ArticleCard article={article} />;
}`;
      tailwindCode = `<!-- Article Card Component -->
<div class="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
  <div class="aspect-w-16 aspect-h-9 relative">
    <img 
      src="https://www.motortrend.com/files/67eeb24ae58cfc000822372c/bestmidsizesuvs.jpg" 
      alt="Best SUVs for Families in 2025" 
      class="object-cover w-full h-full"
    />
    <span class="absolute top-2 left-2 rounded-full px-2.5 py-0.5 bg-primary/90 text-xs font-semibold text-white">
      SUV
    </span>
  </div>
  <div class="p-4">
    <h3 class="font-bold text-lg line-clamp-2 mb-2">Best SUVs for Families in 2025</h3>
    <div class="flex items-center text-sm text-muted-foreground space-x-3">
      <span>Mar 15, 2025</span>
      <span>•</span>
      <span>5 min read</span>
    </div>
  </div>
</div>`;
    } else if (cardType === 'photo') {
      tsxCode = `import PhotoCard from '@/components/PhotoCard';

export function PhotoCardDemo() {
  const photo = {
    id: 'ph1',
    title: '2025 Porsche 911 GT3 RS - Track Ready',
    imageUrl: 'https://www.motortrend.com/files/679a40fb03dfa1000846f1f8/2025porsche911gt3weissach1.jpg',
    date: '2025-04-02',
    category: 'Sports Car',
    photoCount: 24,
    photographer: 'Michael Johnson',
    position: '1',
    make: 'Porsche',
    carModel: '911 GT3 RS',
    year: '2025'
  };

  return <PhotoCard photo={photo} />;
}`;
      tailwindCode = `<!-- Photo Card Component -->
<div class="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
  <div class="aspect-w-16 aspect-h-9 relative">
    <img 
      src="https://www.motortrend.com/files/679a40fb03dfa1000846f1f8/2025porsche911gt3weissach1.jpg" 
      alt="2025 Porsche 911 GT3 RS - Track Ready" 
      class="object-cover w-full h-full"
    />
    <div class="absolute top-2 right-2 rounded-full px-2.5 py-0.5 bg-black/70 text-xs font-semibold text-white flex items-center">
      <svg class="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/>
      </svg>
      24 Photos
    </div>
  </div>
  <div class="p-4">
    <h3 class="font-bold text-lg line-clamp-2 mb-2">2025 Porsche 911 GT3 RS - Track Ready</h3>
    <div class="flex items-center text-sm text-muted-foreground space-x-3">
      <span>Sports Car</span>
      <span>•</span>
      <span>Apr 2, 2025</span>
    </div>
  </div>
</div>`;
    } else if (cardType === 'video') {
      tsxCode = `import VideoCard from '@/components/VideoCard';

export function VideoCardDemo() {
  const video = {
    id: 'vid1',
    title: '2025 Rivian R2 Off-Road Test: Better Than a Jeep?',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65ebc644c7bc5b000866ad3e/0051-rivian-r2-first-look-fullcut-thumbnail-1920x1080.jpg',
    date: '2025-03-28',
    category: 'SUV',
    duration: '12:48',
    views: '245K',
    channelName: 'MotorTrend',
    description: 'We take the all-new Rivian R2 off-road to see how it compares to traditional off-roaders',
    url: '#video-player'
  };

  return <VideoCard video={video} />;
}`;
      tailwindCode = `<!-- Video Card Component -->
<div class="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
  <div class="aspect-w-16 aspect-h-9 relative group">
    <img 
      src="https://d2kde5ohu8qb21.cloudfront.net/files/65ebc644c7bc5b000866ad3e/0051-rivian-r2-first-look-fullcut-thumbnail-1920x1080.jpg" 
      alt="2025 Rivian R2 Off-Road Test" 
      class="object-cover w-full h-full"
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
        <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </div>
    </div>
    <div class="absolute bottom-2 right-2 rounded-sm px-1.5 py-0.5 bg-black/80 text-xs font-medium text-white">
      12:48
    </div>
  </div>
  <div class="p-4">
    <h3 class="font-bold text-lg line-clamp-2 mb-2">2025 Rivian R2 Off-Road Test: Better Than a Jeep?</h3>
    <div class="flex items-center text-sm text-muted-foreground space-x-3">
      <span>MotorTrend</span>
      <span>•</span>
      <span>245K views</span>
    </div>
  </div>
</div>`;
    } else if (cardType === 'newCar' || cardType === 'usedCar') {
      const isNew = cardType === 'newCar';
      const car = isNew ? {
        id: '1',
        title: '2025 Tesla Model 3 Performance',
        imageUrl: 'https://media.ed.edmunds-media.com/tesla/model-3/2025/oem/2025_tesla_model-3_sedan_long-range_fq_oem_1_1600.jpg',
        price: '$54,990',
        category: 'Electric',
        year: '2025',
        isNew: true
      } : {
        id: '2',
        title: '2022 Toyota Camry XSE',
        imageUrl: 'https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-23.jpg',
        price: '$28,500',
        category: 'Sedan',
        year: '2022',
        mileage: '15,000 miles',
        isNew: false
      };
      tsxCode = `import CarCard from '@/components/CarCard';
import { CarData } from '@/components/CarCard';

export function CarCardDemo() {
  const demoCarData: CarData = {
    id: 'demo-car',
    title: '2025 Tesla Model S',
    imageUrl: 'https://example.com/tesla-model-s.jpg',
    price: '$89,990',
    category: 'Luxury',
    year: '2025',
    mileage: '0',
    dealer: 'Tesla Motors',
    location: 'San Francisco, CA',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    bodyStyle: 'Sedan',
    isNew: ${isNew},
    motorTrendScore: ${isNew ? '9.2' : '8.5'},
    motorTrendRank: ${isNew ? '1' : '3'},
    motorTrendCategoryRank: true,
    // New car specs
    msrp: '${isNew ? 'From $54,990' : 'From $46,800'}',
    mpg: '${!isNew ? 'Up to 15 city / 24 highway' : ''}',
    mpge: '${isNew ? 'Up to 134 city / 126 highway' : ''}',
    range: '${isNew ? '315 to 341 mi battery-only' : '320 mi fuel tank'}',
    engine: '${isNew ? 'Electric' : '5.0L V8'}',
    horsepower: '${isNew ? '450 to 510 hp' : '486 hp'}',
    transmission: '${isNew ? '1-speed automatic' : '6-speed manual'}'
  };

  return <CarCard car={car} type="${isNew ? 'new' : 'used'}" />;
}`;
        tailwindCode = `<!-- ${isNew ? 'New' : 'Used'} Car Card Component -->
<div class="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
  <div class="aspect-w-16 aspect-h-9 relative">
    <img 
      src="${car.imageUrl}" 
      alt="${car.title}" 
      class="object-cover w-full h-full"
    />
    ${isNew ? '<span class="absolute top-2 left-2 rounded-full px-2.5 py-0.5 bg-green-600 text-xs font-semibold text-white">New</span>' : ''}
    <button class="absolute top-2 right-2 rounded-full p-1.5 bg-white/80 hover:bg-white shadow-sm">
      <svg class="w-5 h-5 text-neutral-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  </div>
  <div class="p-4">
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-bold text-lg line-clamp-2">${car.title}</h3>
      <span class="font-bold text-lg text-primary">${car.price}</span>
    </div>
    <div class="flex items-center text-sm text-muted-foreground space-x-2 mb-3">
      <span>${car.category}</span>
      <span>•</span>
      <span>${car.year}</span>${!isNew ? `
      <span>•</span>
      <span>${car.mileage}</span>` : ''}
    </div>
    <div class="flex items-center">
      <div class="text-sm font-medium bg-neutral-100 rounded px-2 py-0.5 flex items-center">
        <span class="text-primary font-bold mr-1">${isNew ? '9.2' : '8.5'}</span>
        <span>MT Score</span>
      </div>
    </div>
  </div>
</div>`;
      }
      result = {
        tsx: tsxCode,
        tailwind: tailwindCode
      };
      setSnippets(result);
    }
    return {
      tsx: '// Select a component to see code',
      tailwind: '// Select a component to see code'
    };
  };
  const { tsx, tailwind } = generateSnippets();

  // Render component based on selected properties
  const renderComponent = () => {
    if (selectedComponent === 'button') {
      const {
        variant,
        size,
        disabled,
        withIcon,
        text
      } = properties;
      return <Button variant={variant} size={size} disabled={disabled}>
        {withIcon && <Download className="mr-2 h-4 w-4" />}
        {text}
      </Button>;
    }
    if (selectedComponent === 'card') {
      const {
        withHeader,
        withFooter,
        title,
        description
      } = properties;
      return <Card className="w-full max-w-md">
          {withHeader && <CardHeader>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>}
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
          {withFooter && <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>}
        </Card>;
    }
    if (selectedComponent === 'contentCard') {
      const {
        cardType
      } = properties;
      const cardData = sampleData[cardType as keyof typeof sampleData];
      if (cardType === 'article') {
        return <div className="w-full max-w-md mx-auto p-1">
            <ArticleCard article={cardData as any} />
          </div>;
      }
      if (cardType === 'photo') {
        return <div className="w-full max-w-md mx-auto p-1">
            <PhotoCard photo={cardData as any} />
          </div>;
      }
      if (cardType === 'video') {
        return <div className="w-full max-w-md mx-auto p-1">
            <VideoCard video={cardData as any} />
          </div>;
      }
      if (cardType === 'newCar' || cardType === 'usedCar') {
        return <div className="w-full max-w-md mx-auto p-1">
            <CarCard car={cardData as CarData} type={cardType === 'newCar' ? 'new' : 'used'} />
          </div>;
      }
    }
    return null;
  };
  useEffect(() => {
    const snippets = generateSnippets();
    setSnippets(snippets);
  }, [buttonProps, badgeProps, cardProps, selectedComponent]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-4">
          <h2 className="typography-title mb-4">Component Playground</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="typography-subtitle mb-2">Preview</h3>
              {renderComponent()}
            </div>
            <div>
              <h3 className="typography-subtitle mb-2">Code</h3>
              <pre className="bg-neutral-1 p-4 rounded">
                <code>{snippets.tsx}</code>
              </pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'button':
        return <Button {...buttonProps} />;
      case 'badge':
        return <Badge {...badgeProps} />;
      case 'card':
        return <Card {...cardProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-4">
          <h2 className="typography-title mb-4">Component Playground</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="typography-subtitle mb-2">Preview</h3>
              {renderComponent()}
            </div>
            <div>
              <h3 className="typography-subtitle mb-2">Code</h3>
              <pre className="bg-neutral-1 p-4 rounded">
                <code>{snippets.tsx}</code>
              </pre>
};
export default ComponentPlayground;