require 'uri'

module Jekyll
  class LinkPreviewTag < Liquid::Tag
    def initialize(tag_name, url, tokens)
      super
      # 따옴표 제거
      @url = url.strip.gsub(/^"|"$/, '')
    end

    def render(context)
      # 외부 사이트 정보를 가져오는 대신, URL을 스타일링된 링크로 바로 출력합니다.
      # CSS 클래스 'pretty-link'를 사용하여 스타일을 적용합니다.
      "<a href='#{@url}' class='pretty-link' target='_blank' rel='noopener noreferrer'>#{@url}</a>"
    end
  end
end

Liquid::Template.register_tag('link_preview', Jekyll::LinkPreviewTag)
