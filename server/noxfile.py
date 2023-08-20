import nox


def extract_file_path(session):
    for arg in session.posargs:
        if arg.startswith("file="):
            return arg.strip("file=")
    return None


@nox.session
def tests(session):
    session.install("unittest2", "pytest", "pytest-custom_exit_code")
    file = extract_file_path(session)
    if file:
        session.run("pytest", file, "--suppress-no-test-exit-code")
    else:
        session.run("pytest", "--suppress-no-test-exit-code")


@nox.session
def lint(session):
    session.install("black", "pycodestyle")
    if "--fix" in session.posargs:
        session.run("black", ".")
    else:
        session.run("black", ".", "--check")

    session.run("pycodestyle", ".", "--exclude=.nox/*")
