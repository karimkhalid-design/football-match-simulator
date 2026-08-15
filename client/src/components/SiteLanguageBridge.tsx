import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateSiteText } from "@/lib/siteTranslations";

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const TEXT_ATTRIBUTES = ["aria-label", "title", "placeholder", "alt"];

function translateElementTree(root: Node, language: "ar" | "en") {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  for (const textNode of textNodes) {
    const parent = textNode.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) continue;
    if (!originalText.has(textNode)) originalText.set(textNode, textNode.nodeValue ?? "");
    const source = originalText.get(textNode) ?? "";
    const translated = translateSiteText(source, language);
    if (textNode.nodeValue !== translated) textNode.nodeValue = translated;
  }

  const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll("*"))] : Array.from(root.childNodes).flatMap((child) => child instanceof Element ? [child, ...Array.from(child.querySelectorAll("*"))] : []);
  for (const element of elements) {
    if (!["BUTTON", "INPUT", "TEXTAREA", "SELECT", "IMG", "OPTION"].includes(element.tagName)) continue;
    let attrs = originalAttributes.get(element);
    if (!attrs) {
      attrs = new Map();
      originalAttributes.set(element, attrs);
    }
    for (const attribute of TEXT_ATTRIBUTES) {
      const value = element.getAttribute(attribute);
      if (value === null) continue;
      if (!attrs.has(attribute)) attrs.set(attribute, value);
      const translated = translateSiteText(attrs.get(attribute) ?? value, language);
      if (value !== translated) element.setAttribute(attribute, translated);
    }
  }
}

export default function SiteLanguageBridge() {
  const { language } = useLanguage();

  useEffect(() => {
    let isApplying = false;
    const apply = () => {
      if (isApplying) return;
      isApplying = true;
      translateElementTree(document.body, language);
      isApplying = false;
    };

    apply();
    const observer = new MutationObserver(() => apply());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: TEXT_ATTRIBUTES });
    return () => observer.disconnect();
  }, [language]);

  return null;
}
