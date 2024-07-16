import "./Editor.css";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import SvgIcon from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import CodeIcon from "@mui/icons-material/Code";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
    },
}));

const StyledToggleButton = styled(ToggleButton)(() => ({
  ":focus-visible": { outline: "none" },
  color: "#00000094",
}));

// To do
// Add <hr>, <br>, <code>, strike,
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
        }}
      >
        <StyledToggleButtonGroup size="small" aria-label="text formatting">
          <StyledToggleButton
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
            }
            selected={editor.isActive("heading", { level: 1 })}
            value="heading1"
            aria-label="heading1"
          >
            <SvgIcon>
              <svg
                fill={
                  !editor
                    .can()
                    .chain()
                    .focus()
                    .toggleHeading({ level: 1 })
                    .run()
                    ? "#00000042"
                    : "#00000094"
                }
                viewBox="-5 -7 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm9.52.779H10V3h3.36v7h-1.84V4.779z"></path>
                </g>
              </svg>
            </SvgIcon>
          </StyledToggleButton>
          <StyledToggleButton
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
            }
            selected={editor.isActive("heading", { level: 2 })}
            value="heading2"
            aria-label="heading2"
          >
            <SvgIcon>
              <svg
                fill={
                  !editor
                    .can()
                    .chain()
                    .focus()
                    .toggleHeading({ level: 2 })
                    .run()
                    ? "#00000042"
                    : "#00000094"
                }
                viewBox="-4.5 -7 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm12.88 4.352V10H10V8.986l.1-.246 1.785-1.913c.43-.435.793-.77.923-1.011.124-.23.182-.427.182-.587 0-.14-.04-.242-.127-.327a.469.469 0 0 0-.351-.127.443.443 0 0 0-.355.158c-.105.117-.165.288-.173.525l-.012.338h-1.824l.016-.366c.034-.735.272-1.33.718-1.77.446-.44 1.02-.66 1.703-.66.424 0 .805.091 1.14.275.336.186.606.455.806.8.198.343.3.7.3 1.063 0 .416-.23.849-.456 1.307-.222.45-.534.876-1.064 1.555l-.116.123-.254.229h1.938z"></path>
                </g>
              </svg>
            </SvgIcon>
          </StyledToggleButton>
          <StyledToggleButton
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
            }
            selected={editor.isActive("heading", { level: 3 })}
            value="heading3"
            aria-label="heading3"
          >
            <SvgIcon>
              <svg
                fill={
                  !editor
                    .can()
                    .chain()
                    .focus()
                    .toggleHeading({ level: 3 })
                    .run()
                    ? "#00000042"
                    : "#00000094"
                }
                viewBox="-4.5 -6.5 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm12.453 2.513l.043.055c.254.334.38.728.38 1.172 0 .637-.239 1.187-.707 1.628-.466.439-1.06.658-1.763.658-.671 0-1.235-.209-1.671-.627-.436-.418-.673-.983-.713-1.676L10 7.353h1.803l.047.295c.038.238.112.397.215.49.1.091.23.137.402.137a.566.566 0 0 0 .422-.159.5.5 0 0 0 .158-.38c0-.163-.067-.295-.224-.419-.17-.134-.438-.21-.815-.215l-.345-.004v-1.17l.345-.004c.377-.004.646-.08.815-.215.157-.124.224-.255.224-.418a.5.5 0 0 0-.158-.381.566.566 0 0 0-.422-.159.568.568 0 0 0-.402.138c-.103.092-.177.251-.215.489l-.047.295H10l.022-.37c.04-.693.277-1.258.713-1.675.436-.419 1-.628 1.67-.628.704 0 1.298.22 1.764.658.468.441.708.991.708 1.629a1.892 1.892 0 0 1-.424 1.226z"></path>
                </g>
              </svg>
            </SvgIcon>
          </StyledToggleButton>
          <Divider
            flexItem
            orientation="vertical"
            sx={{ display: { xs: "none", sm: "block" }, mx: 0.5, my: 1 }}
          />
          <StyledToggleButton
            sx={{ marginLeft: { xs: "4px !important", sm: 0 } }}
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            selected={editor.isActive("bold")}
            value="bold"
            aria-label="bold"
          >
            <FormatBoldIcon />
          </StyledToggleButton>
          <StyledToggleButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            selected={editor.isActive("italic")}
            value="italic"
            aria-label="italic"
          >
            <FormatItalicIcon />
          </StyledToggleButton>
          <StyledToggleButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            selected={editor.isActive("strike")}
            value="strike"
            aria-label="strike"
          >
            <StrikethroughSIcon />
          </StyledToggleButton>
          <StyledToggleButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            disabled={!editor.can().chain().focus().setHorizontalRule().run()}
            value="horizontalRule"
            aria-label="horizontal rule"
          >
            <HorizontalRuleIcon />
          </StyledToggleButton>
          <StyledToggleButton
            onClick={() => editor.chain().focus().setHardBreak().run()}
            disabled={!editor.can().chain().focus().setHardBreak().run()}
            value="break"
            aria-label="break"
          >
            <SvgIcon>
              <svg
                fill="#00000094"
                width="800px"
                height="800px"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0" fill="none" width="20" height="20" />

                <g>
                  <path d="M16 4h2v9H7v3l-5-4 5-4v3h9V4z" />
                </g>
              </svg>
            </SvgIcon>
          </StyledToggleButton>
          <Divider
            flexItem
            orientation="vertical"
            sx={{ mx: 0.5, my: 1 }}
          />
          <StyledToggleButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            selected={editor.isActive("bulletList")}
            value="bulletList"
            aria-label="bulletList"
          >
            <FormatListBulletedIcon />
          </StyledToggleButton>
          <StyledToggleButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            selected={editor.isActive("orderedList")}
            value="orderedList"
            aria-label="orderedList"
          >
            <FormatListNumberedIcon />
          </StyledToggleButton>
          <Divider
            flexItem
            orientation="vertical"
            sx={{ display: { xs: "none", sm: "block" }, mx: 0.5, my: 1 }}
          />
          <StyledToggleButton
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
            onClick={setLink}
            disabled={
              !editor.can().chain().focus().toggleLink({ href: "" }).run()
            }
            selected={editor.isActive("link")}
            value="link"
            aria-label="link"
          >
            <InsertLinkIcon />
          </StyledToggleButton>
          <StyledToggleButton
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
            selected={editor.isActive("blockquote")}
            value="blockquote"
            aria-label="blockquote"
          >
            <FormatQuoteIcon />
          </StyledToggleButton>
          <StyledToggleButton
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            selected={editor.isActive("code")}
            value="code"
            aria-label="code"
          >
            <CodeIcon />
          </StyledToggleButton>
        </StyledToggleButtonGroup>
        <StyledToggleButtonGroup
          size="small"
          aria-label="text formatting"
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
        >
          <StyledToggleButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
            }
            selected={editor.isActive("heading", { level: 1 })}
            value="heading1"
            aria-label="heading1"
          >
            <SvgIcon>
              <svg
                fill={
                  !editor
                    .can()
                    .chain()
                    .focus()
                    .toggleHeading({ level: 1 })
                    .run()
                    ? "#00000042"
                    : "#00000094"
                }
                viewBox="-5 -7 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm9.52.779H10V3h3.36v7h-1.84V4.779z"></path>
                </g>
              </svg>
            </SvgIcon>
          </StyledToggleButton>
          <StyledToggleButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
            }
            selected={editor.isActive("heading", { level: 2 })}
            value="heading2"
            aria-label="heading2"
          >
            <SvgIcon>
              <svg
                fill={
                  !editor
                    .can()
                    .chain()
                    .focus()
                    .toggleHeading({ level: 2 })
                    .run()
                    ? "#00000042"
                    : "#00000094"
                }
                viewBox="-4.5 -7 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm12.88 4.352V10H10V8.986l.1-.246 1.785-1.913c.43-.435.793-.77.923-1.011.124-.23.182-.427.182-.587 0-.14-.04-.242-.127-.327a.469.469 0 0 0-.351-.127.443.443 0 0 0-.355.158c-.105.117-.165.288-.173.525l-.012.338h-1.824l.016-.366c.034-.735.272-1.33.718-1.77.446-.44 1.02-.66 1.703-.66.424 0 .805.091 1.14.275.336.186.606.455.806.8.198.343.3.7.3 1.063 0 .416-.23.849-.456 1.307-.222.45-.534.876-1.064 1.555l-.116.123-.254.229h1.938z"></path>
                </g>
              </svg>
            </SvgIcon>
          </StyledToggleButton>
          <StyledToggleButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
            }
            selected={editor.isActive("heading", { level: 3 })}
            value="heading3"
            aria-label="heading3"
          >
            <SvgIcon>
              <svg
                fill={
                  !editor
                    .can()
                    .chain()
                    .focus()
                    .toggleHeading({ level: 3 })
                    .run()
                    ? "#00000042"
                    : "#00000094"
                }
                viewBox="-4.5 -6.5 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm12.453 2.513l.043.055c.254.334.38.728.38 1.172 0 .637-.239 1.187-.707 1.628-.466.439-1.06.658-1.763.658-.671 0-1.235-.209-1.671-.627-.436-.418-.673-.983-.713-1.676L10 7.353h1.803l.047.295c.038.238.112.397.215.49.1.091.23.137.402.137a.566.566 0 0 0 .422-.159.5.5 0 0 0 .158-.38c0-.163-.067-.295-.224-.419-.17-.134-.438-.21-.815-.215l-.345-.004v-1.17l.345-.004c.377-.004.646-.08.815-.215.157-.124.224-.255.224-.418a.5.5 0 0 0-.158-.381.566.566 0 0 0-.422-.159.568.568 0 0 0-.402.138c-.103.092-.177.251-.215.489l-.047.295H10l.022-.37c.04-.693.277-1.258.713-1.675.436-.419 1-.628 1.67-.628.704 0 1.298.22 1.764.658.468.441.708.991.708 1.629a1.892 1.892 0 0 1-.424 1.226z"></path>
                </g>
              </svg>
            </SvgIcon>
          </StyledToggleButton>
          <Divider
            flexItem
            orientation="vertical"
            sx={{ mx: 0.5, my: 1 }}
          />
          <StyledToggleButton
            onClick={setLink}
            disabled={
              !editor.can().chain().focus().toggleLink({ href: "" }).run()
            }
            selected={editor.isActive("link")}
            value="link"
            aria-label="link"
          >
            <InsertLinkIcon />
          </StyledToggleButton>
          <StyledToggleButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
            selected={editor.isActive("blockquote")}
            value="blockquote"
            aria-label="blockquote"
          >
            <FormatQuoteIcon />
          </StyledToggleButton>
          <StyledToggleButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            selected={editor.isActive("code")}
            value="code"
            aria-label="code"
          >
            <CodeIcon />
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </>
  );
};

type EditorProps = {
  setContent: (value: {
    content: string;
    words: number;
    characters: number;
  }) => void;
  pageHeaderHeight: number;
};

export default ({ setContent, pageHeaderHeight }: EditorProps) => {
  const theme = useTheme();
  const targetRef = useRef<HTMLDivElement>(null);
  const [targetRefHeight, setTargetRefHeight] = useState(0);
  useEffect(() => {
    if (targetRef.current) {
      // console.log(targetRef, targetRef.current, targetRef.current.clientHeight);
      setTargetRefHeight(targetRef.current.clientHeight);
    }
  }, [targetRef.current?.clientHeight]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        gapcursor: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["https"],
      }),
      CharacterCount.configure(),
    ],
    content: `
      <h1>
        Guide for Bloggers
      </h1>
      <h2>
        Writing a Chess Blog Post
      </h2>
      <ol>
        <li><p>
          <strong>Choose a Topic:</strong> 
          Select topics like chess basics, strategies, 
          famous games, or player profiles.
        </p></li>
        <li><p>
          <strong>Craft a Title:</strong> 
          Make it clear and intriguing, e.g., 
          "Mastering the Sicilian Defense."
        </p></li>
        <li><p>
          <strong>Write an Introduction:</strong> 
          Hook readers with the topic’s importance.
        </p></li>
        <li><p>
          <strong>Structure Content:</strong> 
          Use headings and subheadings for clarity.
        </p></li>
        <li><p>
          <strong>Use Visuals:</strong> 
          Include diagrams or images.
        </p></li>
        <li><p>
          <strong>Offer Tips:</strong> 
          Provide actionable advice.
        </p></li>
        <li><p>
          <strong>Include Quotes:</strong> 
          Inspire with famous chess quotes.
        </p></li>
        <li><p>
          <strong>Engage Readers:</strong> 
          Encourage comments and interaction.
        </p></li>
        <li><p>
          <strong>Edit:</strong> 
          Ensure error-free, smooth flow.
          </p></li>
        <li><p>
          <strong>Call to Action:</strong> 
          Invite further engagement.
        </p></li>
      </ol>
      <p>Here's a famous quote by <em>Tigran Petrosian</em> :-</p>
      <blockquote>
        “Chess is a game by its form, an art by 
        its content and a science by the difficulty 
        of gaining mastery in it.”
        <br>by <strong>Tigran Petrosian</strong>
      </blockquote>
      <p>
        By following these steps, you'll create 
        engaging chess blog posts. Happy blogging!
      </p>
    `,
    editorProps: {
      attributes: {
        spellcheck: "false",
        class: "editor-content",
      },
    },
  });

  useEffect(() => {
    if (editor)
      setContent({
        words: editor.storage.characterCount.words(),
        characters: editor.storage.characterCount.characters(),
        content: editor.getHTML(),
      });
  }, [editor, editor?.getHTML()]);

  return (
    <>
      <div ref={targetRef}>
        <MenuBar editor={editor} />
      </div>
      <div style={{ all: "initial" }}>
        <Box
          sx={{ mt: 1, p: 1, border: "2px dashed #d0cece", borderRadius: 1 }}
        >
          <Box
            sx={{
              "::-webkit-scrollbar-track": {
                WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                backgroundColor: "#F5F5F5",
              },
              "::-webkit-scrollbar": {
                width: "6px",
                backgroundColor: "#F5F5F5",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "#b7b7b795",
              },
              // border: "2px dashed #d0cece",
              // borderRadius: 1,
              maxHeight: {
                xs: `calc(100vh - 56px - ${pageHeaderHeight}px - ${targetRefHeight}px - ${theme.spacing(
                  2
                )} - 10px - 16px)`,
                sm: `calc(100vh - 64px - ${pageHeaderHeight}px - ${targetRefHeight}px - ${theme.spacing(
                  2
                )} - 10px - 16px)`,
                md: `calc(100vh - ${pageHeaderHeight}px - ${targetRefHeight}px - ${theme.spacing(
                  4
                )} - 10px - 16px)`,
              },
              overflowY: "auto",
            }}
          >
            <EditorContent editor={editor} />
          </Box>
        </Box>
      </div>
    </>
  );
};
