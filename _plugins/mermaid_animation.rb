# _plugins/mermaid_animation.rb
require 'json'
require 'cgi'

module Jekyll
  class MermaidAnimationTag < Liquid::Block
    @@index = 0

    def initialize(tag_name, markup, parse_context)
      super
      @interval = 1500 # 기본 프레임 간격 (1.5초)
      if markup.strip =~ /interval=(\d+)/
        @interval = $1.to_i
      end

      @title = "Mermaid Animation" # 기본 제목
      if markup.strip =~ /title="([^"]*)"/
        @title = $1
      end
    end

    def render(context)
      # --- 를 기준으로 각 프레임(Mermaid 코드)을 분리
      frames = super.strip.split(/^\s*---\s*$/).map(&:strip).reject(&:empty?)
      return "<p>Error: No frames found for Mermaid animation.</p>" if frames.empty?

      # 프레임 데이터를 JSON으로 변환하고 HTML 이스케이프 처리
      frames_json = CGI.escapeHTML(frames.to_json)

      @@index += 1
      id_prefix = "mermaid-anim-#{@@index}"

      html = <<~HTML
        <div class="mermaid-animation-block" id="#{id_prefix}" data-interval="#{@interval}" data-frames='#{frames_json}'>
          <div class="mermaid-animation-header">
            <span class="mermaid-animation-title">#{CGI.escapeHTML(@title)}</span>
            <div class="mermaid-animation-controls">
              <button class="control-btn pause-btn" aria-label="Pause animation">❚❚</button>
              <button class="control-btn play-btn" aria-label="Play animation" style="display: none;">▶</button>
            </div>
          </div>
          <div class="mermaid-graph-container" id="#{id_prefix}-graph">
            </div>
        </div>
      HTML

      html
    end
  end
end

Liquid::Template.register_tag('mermaid_animation', Jekyll::MermaidAnimationTag)
