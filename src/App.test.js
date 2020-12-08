import React from 'react';
import { render, screen } from '@testing-library/react';
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import Layout from './components/Layout';
import Song from './components/Song'
import Album from './components/Album'
import Artist from './components/Artist'

const song = [{ title: "abc", sentiment: "good", sentimentVal: 0.5, lyrics: "hi" }]

describe("Test Frontend application", () => {

  beforeAll(() => {
    configure({ adapter: new Adapter() });
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  test('Render layout texts', () => {
    render(<Layout />);
    expect(screen.getByText(/Lyrics Sentiment/)).toBeInTheDocument();
    expect(screen.getByText(/Middlebury College Jackson Chen '21 Eric Leung '21/)).toBeInTheDocument();
  });

  test('Render Artist components', () => {
    const wrapper = shallow(<Artist />);
    expect(wrapper.find('List').length).toBe(1);
  });

  test('Render Album components', () => {
    const wrapper = shallow(<Album />);
    expect(wrapper.find('Tabs').length).toBe(1);
    expect(wrapper.find('TabPane').length).toBe(2);
    expect(wrapper.find('List').length).toBe(1);
    expect(wrapper.find('Line').length).toBe(1);
  });

  test('Render Song components', () => {
    const wrapper = shallow(<Song />);
    expect(wrapper.find('List').length).toBe(1);
  });

});
