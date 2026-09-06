import beautify from 'js-beautify';
import type { CodeFiles } from '../types/lesson';

const options = {
  indent_size: 2,
  indent_char: ' ',
  max_preserve_newlines: 2,
  preserve_newlines: true,
  end_with_newline: true,
  wrap_line_length: 120,
};

export function formatCode(lang: keyof CodeFiles, source: string): string {
  if (!source || !source.trim()) return source;

  try {
    if (lang === 'html') {
      return beautify.html(source, {
        ...options,
        indent_inner_html: false,
        extra_liners: [],
        unformatted: ['code', 'pre'],
      });
    }

    if (lang === 'css') {
      return beautify.css(source, {
        ...options,
        selector_separator_newline: true,
        newline_between_rules: true,
      });
    }

    if (lang === 'js') {
      return beautify.js(source, {
        ...options,
        space_after_anon_function: true,
        brace_style: 'collapse',
      });
    }

    return source;
  } catch (err) {
    console.error('Failed to format code:', err);
    return source;
  }
}
