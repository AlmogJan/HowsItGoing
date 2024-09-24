import { Button, SvgIcon, styled } from "@mui/joy"

type UploadImgProps = {
    onImageUpload: (img: string) => void
}
export function UploadImg({ onImageUpload }: UploadImgProps) {

    const VisuallyHiddenInput = styled('input')`
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
        white-space: nowrap;
        width: 1px;
      `;

    return <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        startDecorator={
            <SvgIcon>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                </svg>
            </SvgIcon>
        }
    >
        Upload a file
        <VisuallyHiddenInput type="file" onChange={(ev) => {
            if (ev.target.files) {
                const file = ev.target.files[0] || null;
                if (file) {
                    const fileReader = new FileReader();
                    fileReader.onloadend = () => {
                        onImageUpload(fileReader.result as string)
                    }
                    fileReader.readAsDataURL(file);

                }
            }
        }} />
    </Button>
}